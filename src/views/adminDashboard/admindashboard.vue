<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import NavBar from '../../components/NavBar.vue'
import axios from 'axios'

// API base URL - update this with your actual backend URL
const API_BASE_URL = 'https://amassignment.onrender.com/api'

/* =====================
   STATE
===================== */
const tab = ref('members')
const searchQuery = ref('')
const showAddModal = ref(false)
const currentFormData = ref({})
const isLoading = ref(false)
const formErrors = ref({})
const showReportGenerator = ref(false)
const selectedReport = ref('members-summary')
const reportParams = ref({})
const reportResults = ref(null)
const reportLoading = ref(false)
const availableCities = ref([])
const availableTypes = ref([])

/* =====================
   Reports
===================== */
const reportConfigs = {
  'members-summary': {
    name: 'Members Summary',
    description: 'Provide a summary of members, including number of members.',
    endpoint: `${API_BASE_URL}/reports/members-summary`,
    params: []
  },
  'reservations-by-employee': {
    name: 'Reservations by Employee',
    description: 'Show reservations by employee, with details of members and attractions handled.',
    endpoint: `${API_BASE_URL}/reports/reservations-by-employee`,
    params: []
  },
  'monthly-report': {
    name: 'Monthly Report',
    description: 'Generate a monthly report highlighting popular attractions and reservation counts.',
    endpoint: `${API_BASE_URL}/reports/monthly-report`,
    params: [
      { key: 'month', label: 'Month (1-12)', type: 'number', min: 1, max: 12, default: new Date().getMonth() + 1 },
      { key: 'year', label: 'Year', type: 'number', default: new Date().getFullYear() }
    ]
  },
  'members-alphabetical': {
    name: 'Members Alphabetical',
    description: 'List all members, sorted alphabetically by last name.',
    endpoint: `${API_BASE_URL}/reports/members-alphabetical`,
    params: []
  },
    'attractions-by-filter': {
    name: 'Attractions by Filter',
    description: 'Retrieve attractions by city or category, sorted by name.',
    endpoint: `${API_BASE_URL}/reports/attractions-by-filter`,
    params: [
      { 
        key: 'city', 
        label: 'City', 
        type: 'select', 
        options: [],
        placeholder: 'Select city' 
      },
      { 
        key: 'type', 
        label: 'Type', 
        type: 'select', 
        options: [], 
        placeholder: 'Select type' 
      }
    ]
  },
  'reservations-by-date-range': {
    name: 'Reservations by Date Range',
    description: 'Display reservations within a selected date range, including member and attraction details.',
    endpoint: `${API_BASE_URL}/reports/reservations-by-date-range`,
    params: [
      { key: 'start_date', label: 'Start Date', type: 'date', required: true },
      { key: 'end_date', label: 'End Date', type: 'date', required: true }
    ]
  },
  'top-attractions': {
    name: 'Top Attractions',
    description: 'Identify the top N most reserved attractions and their locations.',
    endpoint: `${API_BASE_URL}/reports/top-attractions`,
    params: [
      { key: 'limit', label: 'Number of Results (1-20)', type: 'number', min: 1, max: 20, default: 5 }
    ]
  },
  'revenue-report': {
    name: 'Revenue Report',
    description: 'Calculate revenue from attraction reservations.',
    endpoint: `${API_BASE_URL}/reports/revenue-report`,
    params: [
      { key: 'start_date', label: 'Start Date (Optional)', type: 'date' },
      { key: 'end_date', label: 'End Date (Optional)', type: 'date' }
    ]
  }
}

const openReportsModal = async () => {
  if (tab.value !== 'reports') {
    tab.value = 'reports'
    await fetchData()
  }
  showReportsModal.value = true
  selectedReport.value = ''
  reportResults.value = null
  
  // Get city and type options
  try {
    const [citiesRes, typesRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/attractions`),
      axios.get(`${API_BASE_URL}/attractions`)
    ])
    
    availableCities.value = [...new Set(citiesRes.data.map(a => a.city).filter(Boolean))]
    availableTypes.value = [...new Set(typesRes.data.map(a => a.type).filter(Boolean))]
    
   // Options in update report configuration
    reportConfigs['attractions-by-filter'].params[0].options = availableCities.value
    reportConfigs['attractions-by-filter'].params[1].options = availableTypes.value
  } catch (error) {
    console.error('Error fetching filter options:', error)
  }
}

const closeReportsModal = () => {
  showReportsModal.value = false
  selectedReport.value = ''
  reportParams.value = {}
  reportResults.value = null
}


const formatNumber = (num) => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2
  }).format(num)
}


watch(tab, () => {
  searchQuery.value = ''
  if (tab.value === 'reports') {
   // Get filter options when switching to the Reports page
    fetchFilterOptions()
    showReportGenerator.value = true
    reportResults.value = null
  } else {
    showReportGenerator.value = false
    reportResults.value = null
  }
  fetchData()
})

/* =====================
   FORM TEMPLATES FOR EACH TAB
===================== */
const formTemplates = {
  members: {
    name: '',
    email: '',
    phone: '',
    address: '',
    preferred: ''
  },
  employees: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  attractions: {
    name: '',
    description: '',
    type: '',
    entry_fee: '',
    location: '',
    city: ''
  },
  locations: {
    state: '',
    country: 'Malaysia',
    person_in_charge: ''
  },
  reservations: {
    member: '',
    attraction: '',
    employee: '',
    reservation_date: '',
    reservation_time: '',
    number_of_visitors: '',
    entry_fee: '',
    total_cost: '',
  },

}

/* =====================
   API ENDPOINTS
===================== */
const apiEndpoints = {
  members: `${API_BASE_URL}/members`,
  employees: `${API_BASE_URL}/employees`,
  attractions: `${API_BASE_URL}/attractions`,
  locations: `${API_BASE_URL}/locations`,
  reservations: `${API_BASE_URL}/reservations`,
 
}

/* =====================
   DATA
===================== */
const members = ref([])
const employees = ref([])
const attractions = ref([])
const locations = ref([])
const reservations = ref([])


/* =====================
   METHODS
===================== */
// Fetch data from API
const fetchData = async () => {
  try {
    if (tab.value === 'reports') {
    
      isLoading.value = false
      return
    }
    
    isLoading.value = true
    const endpoint = apiEndpoints[tab.value]
    const response = await axios.get(endpoint)
    
    switch (tab.value) {
      case 'members':
        members.value = response.data
        break
      case 'employees':
        employees.value = response.data
        break
      case 'attractions':
        attractions.value = response.data
        break
      case 'locations':
        locations.value = response.data
        break
      case 'reservations':
        reservations.value = response.data
        break
    }
  } catch (error) {
    console.error(`Error fetching ${tab.value}:`, error)
    loadDummyData()
  } finally {
    isLoading.value = false
  }
}

// Dummy data fallback
const loadDummyData = () => {
  if (tab.value === 'members' && members.value.length === 0) {
    members.value = [{ id: 1, name: 'John Doe', email: 'john@mail.com', phone: '0123456789', address: 'Kuala Lumpur', preferences: 'Roller Coaster' }]
  }
  if (tab.value === 'employees' && employees.value.length === 0) {
    employees.value = [{ id: 1, name: 'Alice Tan', position: 'Manager', email: 'alice@mail.com', phone: '0198888888', status: 'Active' }]
  }
  if (tab.value === 'attractions' && attractions.value.length === 0) {
    attractions.value = [{ id: 1, name: 'Sky Wheel', category: 'Ride', location: 'Zone A', capacity: 20, status: 'Open' }]
  }
  if (tab.value === 'locations' && locations.value.length === 0) {
    locations.value = [{ id: 1, name: 'Main Park', address: '123 Street', city: 'Kuala Lumpur', country: 'Malaysia' }]
  }
  if (tab.value === 'reservations' && reservations.value.length === 0) {
    reservations.value = [{ id: 1, member: 'John Doe', attraction: 'Sky Wheel', date: '2025-01-01', time: '10:00', status: 'Confirmed' }]
  }
  if (tab.value === 'reports' && reports.value.length === 0) {
    reports.value = [{ id: 1, name: 'Monthly Sales', type: 'Finance', by: 'Admin', date: '2025-01-01' }]
  }
}

const runReport = async () => {
  if (!selectedReport.value) return
  
  reportLoading.value = true
  reportResults.value = null
  
  try {
    const config = reportConfigs[selectedReport.value]
    
    // 构建查询参数
    const params = {}
    config.params.forEach(param => {
      if (reportParams.value[param.key] !== undefined && reportParams.value[param.key] !== '') {
        params[param.key] = reportParams.value[param.key]
      } else if (param.default !== undefined) {
        params[param.key] = param.default
      }
    })
    
    console.log('Running report with params:', params)
    
    const response = await axios.get(config.endpoint, { params })
    
    if (response.data.success) {
      reportResults.value = response.data
    } else {
      throw new Error(response.data.error || 'Failed to generate report')
    }
    
  } catch (error) {
    console.error('Error running report:', error)
    alert(`Failed to run report: ${error.message}`)
  } finally {
    reportLoading.value = false
  }
}

const openReportGenerator = () => {
  showReportGenerator.value = true
  selectedReport.value = 'members-summary'
  reportParams.value = {}
  reportResults.value = null
}

const closeReportGenerator = () => {
  showReportGenerator.value = false
}

const exportToCSV = () => {
  if (!reportResults.value || !reportResults.value.data) return
  
  let data = reportResults.value.data
  if (!Array.isArray(data) || data.length === 0) {
    alert('No data to export')
    return
  }
  
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header]
      return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
    }).join(','))
  ]
  
  const csvContent = csvRows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${selectedReport.value}-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2
  }).format(amount || 0)
}

// Open add modal
const openAddModal = () => {
  currentFormData.value = { ...formTemplates[tab.value] }
  formErrors.value = {}
  showAddModal.value = true
}

// Close add modal
const closeAddModal = () => {
  showAddModal.value = false
  currentFormData.value = {}
  formErrors.value = {}
}

// Validate form
const validateForm = () => {
  const errors = {}
  const data = currentFormData.value
  
  // Basic required field validation
  Object.keys(data).forEach(key => {
    if (!data[key] && data[key] !== 0) {
      errors[key] = `${key} is required`
    }
  })
  
  // Email validation for email fields
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format'
  }
  
  formErrors.value = errors
  console.log(errors)
  return Object.keys(errors).length === 0
}

// Submit form to API
const submitForm = async () => {
  if (!validateForm()) {
    console.log(1)
    return
  }
  
  try {
    console.log("current form data: ", currentFormData.value)
    isLoading.value = true
    const endpoint = apiEndpoints[tab.value]
    const response = await axios.post(endpoint, currentFormData.value)
    
    // Add the new item to the appropriate array
    const newItem = response.data
    switch (tab.value) {
      case 'members':
        members.value.push(newItem)
        break
      case 'employees':
        employees.value.push(newItem)
        break
      case 'attractions':
        attractions.value.push(newItem)
        break
      case 'locations':
        locations.value.push(newItem)
        break
      case 'reservations':
        reservations.value.push(newItem)
        break
      case 'reports':
        reports.value.push(newItem)
        break
    }
    
    closeAddModal()
  } catch (error) {
    console.error(`Error adding ${tab.value}:`, error)
    alert(`Failed to add ${tab.value}. Please try again.`)
  } finally {
    isLoading.value = false
  }
}

// Delete item
const deleteItem = async (id, index) => {
  if (!confirm('Are you sure you want to delete this item?')) {
    return
  }
  
  try {
    const endpoint = `${apiEndpoints[tab.value]}/${id}`
    await axios.delete(endpoint)
    console.log(id)
    
    // Remove from local array
    switch (tab.value) {
      case 'members':
        members.value.splice(index, 1)
        break
      case 'employees':
        employees.value.splice(index, 1)
        break
      case 'attractions':
        attractions.value.splice(index, 1)
        break
      case 'locations':
        locations.value.splice(index, 1)
        break
      case 'reservations':
        reservations.value.splice(index, 1)
        break
      case 'reports':
        reports.value.splice(index, 1)
        break
    }
  } catch (error) {
    console.error(`Error deleting ${tab.value}:`, error)
    alert('Failed to delete item. Please try again.')
  }
}

/* =====================
   COMPUTED PROPERTIES
===================== */


const filteredMembers = computed(() => filterBySearch(members.value))
const filteredEmployees = computed(() => filterBySearch(employees.value))
const filteredAttractions = computed(() => filterBySearch(attractions.value))
const filteredLocations = computed(() => filterBySearch(locations.value))
const filteredReservations = computed(() => filterBySearch(reservations.value))

const filterBySearch = (list) => {
  return list.filter(item =>
    Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
}

// Get current table data for modal labels
const getTableConfig = computed(() => {
  const configs = {
    members: {
      title: 'Add New Member',
      fields: [
        { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
        { key: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address' },
        { key: 'phone', label: 'Phone', type: 'tel', placeholder: 'Enter phone number' },
        { key: 'address', label: 'Address', type: 'text', placeholder: 'Enter address' },
        { key: 'preferred', label: 'Preferences', type: 'text', placeholder: 'Enter preferences' }
      ]
    },
    employees: {
      title: 'Add New Employee',
      fields: [
        { key: 'name', label: 'Full Name', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'phone', label: 'Phone', type: 'tel' },
        { key: 'location', label: 'Location In-charge', type: 'text' },

      ]
    },
    attractions: {
      title: 'Add New Attraction',
      fields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'type', label: 'Type', type: 'text' },
        { key: 'entry_fee', label: 'Entry Fee', type: 'number' },
        { key: 'location', label: 'State', type: 'text' },
        { key: 'city', label: 'City', type: 'text' },
        
      ]
    },
    locations: {
      title: 'Add New Location',
      fields: [
        { key: 'state', label: 'Location Name', type: 'text' },
        { key: 'country', label: 'Country', type: 'text' },
        { key: 'person_in_charge', label: 'Person In Charge', type: 'text' }
      ]
    },
    reservations: {
      title: 'Add New Reservation',
      fields: [
        { key: 'member', label: 'Member Name', type: 'text' },
        { key: 'attraction', label: 'Attraction', type: 'text' },
        { key: 'employee', label: 'Employee', type: 'text' },
        { key: 'reservation_date', label: 'Reservation Date', type: 'date' },
        { key: 'reservation_time', label: 'Reservation Time', type: 'time' },
        { key: 'number_of_visitors', label: 'Number of Visitors', type: 'number' },
        { key: 'entry_fee', label: 'Entry Fee', type: 'number' },
        { key: 'total_cost', label: 'Total Cost', type: 'number' },
      ]
    }
  }
  return configs[tab.value] || {}
})

/* =====================
   LIFECYCLE & WATCHERS
===================== */
onMounted(() => {
  fetchData()
  // Get city and type options
  fetchFilterOptions()
})

// Get filter options
const fetchFilterOptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/attractions`)
    
    if (response.data && Array.isArray(response.data)) {
    
      const cities = [...new Set(response.data.map(a => a.city).filter(Boolean))]
      availableCities.value = cities.sort()
      
      
      const types = [...new Set(response.data.map(a => a.type).filter(Boolean))]
      availableTypes.value = types.sort()
    }
  } catch (error) {
    console.error('Error fetching filter options:', error)
  }
}

watch(tab, () => {
  searchQuery.value = ''
  if (tab.value !== 'reports') {
    showReportGenerator.value = false
    reportResults.value = null
  }
  fetchData()
})


const getParamOptions = (paramKey) => {
  if (paramKey === 'city') {
    return availableCities.value
  } else if (paramKey === 'type') {
    return availableTypes.value
  }
  return []
}
</script>

<template>
  <div>
    <NavBar />

    <div class="flex">
      <!-- SIDEBAR -->
      <div class="h-screen fixed left-0 top-0 w-64 bg-amber-100 pt-24">
        <ul>
          <li @click="tab='members'" class="menu-item">Members</li>
          <li @click="tab='employees'" class="menu-item">Employees</li>
          <li @click="tab='attractions'" class="menu-item">Attractions</li>
          <li @click="tab='locations'" class="menu-item">Locations</li>
          <li @click="tab='reservations'" class="menu-item">Reservations</li>
          <li @click="tab='reports'" class="menu-item">Reports</li>
        </ul>
      </div>

      <!-- CONTENT -->
      <div class="w-full pl-64 p-6 bg-amber-50 min-h-screen">

  <!-- HEADER - Only displayed on non-Reports pages -->
  <div v-if="tab !== 'reports'" class="flex justify-between items-center mb-6">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="`Search ${tab}...`"
      class="ml-4 w-72 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
    />
    <button
      @click="openAddModal"
      class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
    >
      <span>+ Add New</span>
    </button>
  </div>

 <!-- LOADING STATE - also needs conditional display -->
  <div v-if="isLoading && tab !== 'reports'" class="text-center py-8">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
    <p class="mt-2 text-gray-600">Loading...</p>
  </div>

        <!-- MEMBERS -->
        <div v-if="tab === 'members' && !isLoading" class="p-4">
          <h1 class="title">Members</h1>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Preferences</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(m, index) in filteredMembers" :key="m.id || index">
                  <td>{{ m.name }}</td>
                  <td>{{ m.email }}</td>
                  <td>{{ m.phone }}</td>
                  <td>{{ m.address }}</td>
                  <td>{{ m.preferred }}</td>
                  <td>
                    <button @click="deleteItem(m.member_id, index)" class="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredMembers.length === 0">
                  <td colspan="6" class="text-center py-4 text-gray-500">
                    No members found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- EMPLOYEES -->
        <div v-if="tab === 'employees' && !isLoading" class="p-4">
          <h1 class="title">Employees</h1>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Reservations Completed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(e, index) in filteredEmployees" :key="e.id || index">
                  <td>{{ e.name }}</td>
                  <td>{{ e.email }}</td>
                  <td>{{ e.phone }}</td>
                  <td>{{ e.location }}</td>
                  <td>{{ e.completed_reservations }}</td>
                  
                  <td>
                    <button @click="deleteItem(e.employee_id, index)" class="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredEmployees.length === 0">
                  <td colspan="6" class="text-center py-4 text-gray-500">
                    No employees found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ATTRACTIONS -->
        <div v-if="tab === 'attractions' && !isLoading" class="p-4">
          <h1 class="title">Attractions</h1>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Entry Fee</th>
                  <th>Location</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(a, index) in filteredAttractions" :key="a.id || index">
                  <td>{{ a.name }}</td>
                  <td>{{ a.description }}</td>
                  <td>{{ a.type }}</td>
                  <td>{{ a.entry_fee }}</td>
                  <td>{{ a.location }}</td>
                  <td>{{ a.city }}</td>
                  
                  <td>
                    <button @click="deleteItem(a.attraction_id, index)" class="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredAttractions.length === 0">
                  <td colspan="6" class="text-center py-4 text-gray-500">
                    No attractions found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- LOCATIONS -->
        <div v-if="tab === 'locations' && !isLoading" class="p-4">
          <h1 class="title">Locations</h1>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Country</th>
                  <th>PIC</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(l, index) in filteredLocations" :key="l.id || index">
                  
                  <td>{{ l.state }}</td>
                  <td>{{ l.country }}</td>
                  <td>{{ l.person_in_charge }}</td>
                  <td>
                    <button @click="deleteItem(l.location_id, index)" class="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredLocations.length === 0">
                  <td colspan="5" class="text-center py-4 text-gray-500">
                    No locations found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- RESERVATIONS -->
        <div v-if="tab === 'reservations' && !isLoading" class="p-4">
          <h1 class="title">Reservations</h1>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Attraction</th>
                  <th>Employee</th>
                  <th>Reservation Date</th>
                  <th>Reservation Time</th>
                  <th>No. of Visitors</th>
                  <th>Entry Fee</th>
                  <th>Total Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(r, index) in filteredReservations" :key="r.id || index">
                  <td>{{ r.member }}</td>
                  <td>{{ r.attraction }}</td>
                  <td>{{ r.employee }}</td>
                  <td>{{ r.reservation_date }}</td>
                  <td>{{ r.reservation_time }}</td>
                  <td>{{ r.number_of_visitors }}</td>
                  <td>{{ r.entry_fee }}</td>
                  <td>{{ r.total_cost }}</td>
                  
                  <td>
                    <button @click="deleteItem(r.reservation_id, index)" class="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredReservations.length === 0">
                  <td colspan="6" class="text-center py-4 text-gray-500">
                    No reservations found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

<!-- REPORTS TABLE -->
        <!-- REPORTS PAGE -->
        <div v-if="tab === 'reports'"class="p-4">
          <h1 class="title">Reports</h1>
          
          <!-- Report Generator -->
          <div v-if="showReportGenerator" class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold">Generate Report</h2>
              <button @click="closeReportGenerator" class="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <!-- Report Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Select Report Type
              </label>
              <select 
                v-model="selectedReport"
                @change="reportParams = {}"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>Select a report...</option>
                <option v-for="(config, key) in reportConfigs" :key="key" :value="key">
                  {{ config.name }}
                </option>
              </select>
              
              <p v-if="selectedReport" class="mt-2 text-sm text-gray-600">
                {{ reportConfigs[selectedReport]?.description }}
              </p>
            </div>
            
            <!-- Parameter input -->
            <div v-if="selectedReport && reportConfigs[selectedReport].params.length > 0" class="mb-6">
              <h3 class="text-lg font-medium mb-3">Report Parameters</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="param in reportConfigs[selectedReport].params" :key="param.key">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ param.label }}
                    <span v-if="param.required" class="text-red-500">*</span>
                  </label>
                  
                
                  <input
                    v-if="param.type !== 'select'"
                    v-model="reportParams[param.key]"
                    :type="param.type"
                    :placeholder="param.placeholder || `Enter ${param.label.toLowerCase()}`"
                    :min="param.min"
                    :max="param.max"
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  
                
                  <select
                    v-else
                    v-model="reportParams[param.key]"
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">All {{ param.label }}</option>
                   
                    <option 
                      v-for="option in getParamOptions(param.key)" 
                      :key="option" 
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            
          
            <button
              @click="runReport"
              :disabled="reportLoading"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              <span v-if="reportLoading">Running...</span>
              <span v-else>Run Report</span>
            </button>
          </div>
          
          <!-- Report Results -->
          <div v-if="reportResults" class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold">Report Results</h2>
              <div class="flex gap-2">
                <button
                  @click="exportToCSV"
                  class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                  v-if="reportResults.data && Array.isArray(reportResults.data) && reportResults.data.length > 0"
                >
                  📥 Export CSV
                </button>
              </div>
            </div>
            
            <!-- Report Information -->
            <div class="mb-4 p-3 bg-blue-50 rounded">
              <p class="font-medium">{{ reportConfigs[selectedReport]?.name }}</p>
              <p v-if="reportResults.period" class="text-sm">Period: {{ reportResults.period }}</p>
              <p v-if="reportResults.count !== undefined" class="text-sm">Records: {{ reportResults.count }}</p>
            </div>
            
            <!-- Results are displayed based on report type -->
            <div v-if="selectedReport === 'members-summary' && reportResults.data">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-blue-50 p-4 rounded-lg shadow">
                  <p class="text-sm text-blue-600">Total Members</p>
                  <p class="text-2xl font-bold text-blue-700">{{ reportResults.data.total_members }}</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg shadow">
                  <p class="text-sm text-green-600">With Preferences</p>
                  <p class="text-2xl font-bold text-green-700">{{ reportResults.data.members_with_preferences }}</p>
                </div>
                <div class="bg-yellow-50 p-4 rounded-lg shadow">
                  <p class="text-sm text-yellow-600">Expired Members</p>
                  <p class="text-2xl font-bold text-yellow-700">{{ reportResults.data.expired_members }}</p>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg shadow">
                  <p class="text-sm text-purple-600">Expiring Soon</p>
                  <p class="text-lg font-bold text-purple-700">
                    {{ reportResults.data.earliest_expiry }} to {{ reportResults.data.latest_expiry }}
                  </p>
                </div>
              </div>
            </div>
            
            <div v-else-if="selectedReport === 'revenue-report' && reportResults.totals">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-blue-50 p-4 rounded-lg shadow">
                  <p class="text-sm text-blue-600">Total Reservations</p>
                  <p class="text-2xl font-bold text-blue-700">{{ reportResults.totals.total_reservations }}</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg shadow">
                  <p class="text-sm text-green-600">Total Visitors</p>
                  <p class="text-2xl font-bold text-green-700">{{ reportResults.totals.total_visitors }}</p>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg shadow">
                  <p class="text-sm text-purple-600">Total Revenue</p>
                  <p class="text-2xl font-bold text-purple-700">{{ formatCurrency(reportResults.totals.total_revenue) }}</p>
                </div>
              </div>
              
              <div v-if="reportResults.monthly_data && reportResults.monthly_data.length > 0">
                <h3 class="text-lg font-bold mb-3">Monthly Breakdown</h3>
                <div class="overflow-x-auto">
                  <table class="min-w-full bg-white">
                    <thead>
                      <tr class="bg-gray-100">
                        <th class="px-4 py-2 text-left">Month</th>
                        <th class="px-4 py-2 text-left">Reservations</th>
                        <th class="px-4 py-2 text-left">Visitors</th>
                        <th class="px-4 py-2 text-left">Revenue</th>
                        <th class="px-4 py-2 text-left">Avg/Reservation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in reportResults.monthly_data" :key="index" class="border-t">
                        <td class="px-4 py-2">{{ item.month }}</td>
                        <td class="px-4 py-2">{{ item.total_reservations }}</td>
                        <td class="px-4 py-2">{{ item.total_visitors }}</td>
                        <td class="px-4 py-2">{{ formatCurrency(item.total_revenue) }}</td>
                        <td class="px-4 py-2">{{ formatCurrency(item.average_revenue_per_reservation) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
           
            <div v-else-if="reportResults.data && Array.isArray(reportResults.data) && reportResults.data.length > 0">
              <div class="overflow-x-auto">
                <table class="min-w-full bg-white">
                  <thead>
                    <tr class="bg-gray-100">
                      <th 
                        v-for="(value, key) in reportResults.data[0]" 
                        :key="key"
                        class="px-4 py-2 text-left"
                      >
                        {{ key.replace(/_/g, ' ').toUpperCase() }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="(row, index) in reportResults.data" 
                      :key="index"
                      class="border-t hover:bg-gray-50"
                    >
                      <td 
                        v-for="(value, key) in row" 
                        :key="key"
                        class="px-4 py-2"
                      >
                        <span v-if="key.includes('revenue') || key.includes('fee') || key.includes('cost')">
                          {{ formatCurrency(value) }}
                        </span>
                        <span v-else>
                          {{ value }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p class="mt-2 text-sm text-gray-500">Showing {{ reportResults.data.length }} records</p>
            </div>
            
            <div v-else class="text-center py-8 text-gray-500">
              No data found for this report
            </div>
          </div>
          
         
          <div v-if="!showReportGenerator && !reportResults" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-4">Available Reports</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="(config, key) in reportConfigs" 
                :key="key"
                class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                @click="selectedReport = key; showReportGenerator = true"
              >
                <h3 class="font-bold text-lg mb-2">{{ config.name }}</h3>
                <p class="text-gray-600 text-sm">{{ config.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- ADD MODAL (Slides from right) -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 overflow-hidden">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeAddModal"></div>
      
      <!-- Modal Content -->
      <div class="absolute inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div class="h-full flex flex-col">
          <!-- Header -->
          <div class="flex justify-between items-center p-6 border-b">
            <h2 class="text-xl font-semibold">{{ getTableConfig.title }}</h2>
            <button @click="closeAddModal" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Form -->
          <div class="flex-1 overflow-y-auto p-6">
            <form @submit.prevent="submitForm">
              <div class="space-y-4">
                <div v-for="field in getTableConfig.fields" :key="field.key">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ field.label }}
                  </label>
                  
                  <!-- Text/Email/Tel/Number/Date/Time Input -->
                  <input
                    v-if="!field.options"
                    v-model="currentFormData[field.key]"
                    :type="field.type"
                    :placeholder="field.placeholder || `Enter ${field.label.toLowerCase()}`"
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                    :class="{ 'border-red-500': formErrors[field.key] }"
                  />
                  
                  <!-- Select Input -->
                  <select
                    v-else
                    v-model="currentFormData[field.key]"
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                    :class="{ 'border-red-500': formErrors[field.key] }"
                  >
                    <option value="" disabled>Select {{ field.label.toLowerCase() }}</option>
                    <option v-for="option in field.options" :key="option" :value="option">
                      {{ option }}
                    </option>
                  </select>
                  
                  <!-- Error Message -->
                  <p v-if="formErrors[field.key]" class="mt-1 text-sm text-red-600">
                    {{ formErrors[field.key] }}
                  </p>
                </div>
              </div>
            </form>
          </div>
          
          <!-- Footer -->
          <div class="p-6 border-t bg-gray-50">
            <div class="flex justify-end space-x-3">
              <button
                @click="closeAddModal"
                class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="submitForm"
                :disabled="isLoading"
                class="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                <span v-if="isLoading">Adding...</span>
                <span v-else>Add {{ tab.slice(0, -1) }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.menu-item {
  @apply text-xl p-3 border-b-2 border-b-amber-200 font-mono hover:bg-amber-200 cursor-pointer transition-colors;
}

.title {
  @apply text-2xl font-semibold mb-4 text-gray-800;
}

.table {
  @apply w-full bg-white shadow rounded-lg overflow-hidden;
}

.table th {
  @apply bg-amber-100 text-left p-4 text-gray-700 font-semibold;
}

.table td {
  @apply p-4 border-t border-gray-200 text-gray-600;
}

.table tr:hover {
  @apply bg-amber-50;
}
</style>