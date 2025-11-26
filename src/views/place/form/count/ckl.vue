<template>
  <div class="trip-calculator">
    <div class="header">
      <h1>TRIP TO KUALA LUMPUR</h1>
    </div>
    
    <div class="calculator-container">
      

      <div class="breakdown-section !bg-gray-100">
        <h3>ATTRACTIONS DETAILS</h3>

        <div class="breakdown-grid">
          <div
            v-for="attraction in attractions"
            :key="attraction.id"
            @click="selectAttraction(attraction)"
            class="breakdown-item hover:bg-blue-100 cursor-pointer"
            :class="{ '!bg-blue-300': selectedAttraction?.id === attraction.id }"
          >
            <img
              class="w-11/12 mx-auto mt-4 rounded-md"
              :src="attraction.image"
              alt="attraction"
            />

            <div class="grid grid-cols-4 gap-4 p-4">
              <div class="col-span-3">
                <h1 class="font-semibold text-xl">{{ attraction.name }}</h1>
                <h2 class="text-xs text-gray-500">
                  {{ attraction.description }}
                </h2>
              </div>

              <div class="col-span-1 text-right">
                <h1 class="text-xl">RM {{ attraction.price }}</h1>
                <p class="text-xs text-gray-500">Entry Fee</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- 人数输入区域 -->
      <div class="input-section">
        <div class="input-group">
          <label for="personCount">NUMBER OF PEOPLE (PAX):</label>
          <div class="input-with-buttons">
            <button @click="decreaseCount" class="count-btn" :disabled="personCount <= 1">-</button>
            <input 
              type="number" 
              id="personCount" 
              v-model.number="personCount"
              min="1"
              max="50"
              @change="validateCount"
            >
            <button @click="increaseCount" class="count-btn">+</button>
          </div>
        </div>
      </div>

      <!-- 房间分配可视化 -->
      <div class="room-allocation">
        <h3>Total Price</h3>

        <h3 class="!text-6xl font-semibold !text-black">
          RM {{ totalCost }}
        </h3>

        <p class="allocation-note" v-if="selectedAttraction">
          {{ personCount }} × RM {{ selectedAttraction.price }}
        </p>

        <div class="next-section">
          <router-link to="/fsabah">
            <button @click="Booking()" :disabled="totalCost==0" :class="{'!bg-gray-400': totalCost == 0}" class="big-next-button">
              BOOK
            </button>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import kl1 from '../../../../assets/kl1.jpg'
import kl2 from '../../../../assets/kl2.jpg'
import kl3 from '../../../../assets/kl3.jpg'
import kl4 from '../../../../assets/kl4.jpg'


export default {
  name: 'TripCalculatorKL',

  data() {
    return {
      personCount: 1,
      selectedAttraction: null,

      attractions: [
  {
    id: 1,
    name: 'Petronas Twin Towers',
    description: 'Iconic twin skyscrapers',
    price: 150,
    image: kl1
  },
  {
    id: 2,
    name: 'KL Bird Park',
    description: 'Large aviary nature park',
    price: 55,
    image: kl2
  },
  {
    id: 3,
    name: 'National Museum of Malaysia',
    description: 'Museum showcasing Malaysian history & culture',
    price: 20,
    image: kl3
  },
  {
    id: 4,
    name: 'Jalan Alor Food Street',
    description: 'Popular street food destination',
    price: 10,
    image: kl4
  }
]

    }
  },

  computed: {
    totalCost() {
      if (!this.selectedAttraction) return 0
      return this.selectedAttraction.price * this.personCount
    }
  },

  methods: {
    selectAttraction(attraction) {
      this.selectedAttraction = attraction
    },

    increaseCount() {
      if (this.personCount < 50) this.personCount++
    },

    decreaseCount() {
      if (this.personCount > 1) this.personCount--
    },

    validateCount() {
      if (this.personCount < 1) this.personCount = 1
      if (this.personCount > 50) this.personCount = 50
    },

    Booking() {
      localStorage.setItem('state', 'Selangor')
      localStorage.setItem('attraction', this.selectedAttraction.name)
      localStorage.setItem('entry_fee', this.selectedAttraction.price)
      localStorage.setItem('number_visitors', this.personCount)
      localStorage.setItem('total_cost', this.totalCost)
    }
  },

  mounted() {
    this.validateCount()
  }
}
</script>



<style scoped>
.trip-calculator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f8fa;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 28px;
  margin: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.calculator-container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.input-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.input-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
  font-size: 18px;
}

.input-with-buttons {
  display: flex;
  align-items: center;
  max-width: 300px;
}

.input-with-buttons input {
  flex: 1;
  padding: 12px;
  font-size: 18px;
  text-align: center;
  border: 2px solid #dee2e6;
  border-radius: 0;
  font-weight: bold;
}

.input-with-buttons input:focus {
  outline: none;
  border-color: #4CAF50;
}

.count-btn {
  padding: 12px 24px;
  font-size: 20px;
  font-weight: bold;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.count-btn:first-child {
  border-radius: 6px 0 0 6px;
}

.count-btn:last-child {
  border-radius: 0 6px 6px 0;
}

.count-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.count-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.calculation-tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

@media (max-width: 900px) {
  .calculation-tables {
    grid-template-columns: 1fr;
  }
}

.table-section h2 {
  color: #1e3c72;
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.table-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #dee2e6;
}

.pricing-table, .estimation-table {
  width: 100%;
  border-collapse: collapse;
}

.pricing-table th, .estimation-table th {
  background-color: #1e3c72;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
}

.pricing-table td, .estimation-table td {
  padding: 15px;
  border-bottom: 1px solid #dee2e6;
}

.pricing-table tbody tr:hover {
  background-color: #f1f8ff;
}

.total-row {
  background-color: #e8f5e9 !important;
  font-size: 18px;
}

.total-row td {
  border-top: 2px solid #4CAF50;
}

.room-info {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  font-style: italic;
}

.category-header {
  display: flex;
  flex-direction: column;
}

.category-title {
  font-weight: bold;
  color: #333;
}

.category-desc {
  font-size: 12px;
  color: #666;
  margin-top: 3px;
}

.price-cell {
  font-weight: bold;
  color: #1e3c72;
  font-size: 16px;
}

.total-estimate {
  background-color: #e3f2fd;
}

.total-price {
  font-size: 24px;
  font-weight: bold;
  color: #d32f2f;
}

.breakdown-section {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.breakdown-section h3 {
  color: #1e3c72;
  margin-bottom: 20px;
  text-align: center;
}

.breakdown-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .breakdown-grid {
    grid-template-columns: 1fr;
  }
}

.breakdown-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.breakdown-header {
  padding: 15px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breakdown-header.entertainment {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.breakdown-header.hostel {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.breakdown-header.food {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.breakdown-header h4 {
  margin: 0;
  font-size: 16px;
}

.breakdown-price {
  font-weight: bold;
  font-size: 18px;
}

.breakdown-item ul {
  padding: 15px;
  margin: 0;
  list-style-type: none;
}

.breakdown-item li {
  padding: 8px 0;
  border-bottom: 1px dashed #eee;
  color: #555;
  font-size: 14px;
}

.breakdown-item li:last-child {
  border-bottom: none;
}

.room-allocation {
  margin-top: 40px;
  padding: 30px;
  background-color: #f0f7ff;
  border-radius: 10px;
  border: 2px solid #e3f2fd;
}

.room-allocation h3 {
  color: #1e3c72;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
}

.rooms-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 15px;
}

.room-box {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  min-width: 150px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  transition: transform 0.2s;
}

.room-box:hover {
  transform: translateY(-5px);
}

.room-type-icon {
  font-size: 30px;
  margin-bottom: 10px;
}

.room-details h4 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 18px;
}

.room-details p {
  margin: 5px 0;
  color: #666;
}

.room-price {
  font-weight: bold;
  color: #d32f2f;
  font-size: 18px;
  margin-top: 10px !important;
}

.allocation-note {
  text-align: center;
  color: #666;
  font-style: italic;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 30px;
}

/* 大个的、居中的NEXT按钮样式 */
.next-section {
  margin-top: 40px;
  text-align: center;
  padding: 20px;
  border-top: 2px solid #eee;
}

.big-next-button {
  padding: 25px 80px;
  background-color: #1e3c72;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 6px 20px rgba(30, 60, 114, 0.3);
  min-width: 300px;
}

.big-next-button:hover {
  background-color: #2a5298;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(30, 60, 114, 0.4);
}

.big-next-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
}

.big-next-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(30, 60, 114, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .big-next-button {
    padding: 20px 40px;
    font-size: 24px;
    min-width: 250px;
  }
}

@media (max-width: 480px) {
  .big-next-button {
    padding: 18px 30px;
    font-size: 20px;
    min-width: 200px;
  }
}

@media (max-width: 900px) {
  .breakdown-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .form-container {
    padding: 10px;
  }
  
  .information-form {
    padding: 20px;
  }
  
  .header h1 {
    font-size: 20px;
  }
}
</style>