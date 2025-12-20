<template>
  <div class="trip-calculator">
    <div class="header">
      <h1>TRIP TO SABAH (3 DAY 2 NIGHTS)</h1>
    </div>
    
    <div class="calculator-container">
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

      <!-- 费用计算表格 -->
      <div class="calculation-tables">
        <!-- 左边：基于总人数的费用 -->
        <div class="table-section">
          <h2>ACTIVITY THAT CAN PLAY (PER PAX)</h2>
          <div class="table-container">
            <table class="pricing-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>PER PAX</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ENTERTAINMENT ACTIVITIES</td>
                  <td>RM 550</td>
                  <td>RM {{ calculateTotal('entertainment') }}</td>
                </tr>
                <tr>
                  <td>
                    HOSTEL ACCOMMODATION
                    <div class="room-info">{{ getRoomDescription() }}</div>
                  </td>
                  <td>RM {{ calculatePerPax('hostel') }}</td>
                  <td>RM {{ calculateTotal('hostel') }}</td>
                </tr>
                <tr>
                  <td>FOOD & BEVERAGE</td>
                  <td>RM 250</td>
                  <td>RM {{ calculateTotal('f&b') }}</td>
                </tr>
                <tr class="total-row">
                  <td><strong>TOTAL COST</strong></td>
                  <td><strong>RM {{ calculateAveragePerPax() }}</strong></td>
                  <td><strong>RM {{ calculateGrandTotal() }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 右边：单人费用预估 -->
        <div class="table-section">
          <h2>ESTIMATED COST PER PERSON</h2>
          <div class="table-container">
            <table class="estimation-table">
              <thead>
                <tr>
                  <th>CATEGORY</th>
                  <th>COST (PER PAX)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="category-header">
                      <span class="category-title">ENTERTAINMENT ACTIVITIES</span>
                      <span class="category-desc">Snorkeling, Island Hopping, Jungle Trekking</span>
                    </div>
                  </td>
                  <td class="price-cell">RM 550</td>
                </tr>
                <tr>
                  <td>
                    <div class="category-header">
                      <span class="category-title">ACCOMMODATION</span>
                      <span class="category-desc">{{ getRoomDescription(true) }}</span>
                    </div>
                  </td>
                  <td class="price-cell">RM {{ calculatePerPax('hostel') }}</td>
                </tr>
                <tr>
                  <td>
                    <div class="category-header">
                      <span class="category-title">FOOD & BEVERAGE</span>
                      <span class="category-desc">Breakfast, Lunch, Dinner, Snacks</span>
                    </div>
                  </td>
                  <td class="price-cell">RM 250</td>
                </tr>
                <tr class="total-estimate">
                  <td>
                    <div class="category-header">
                      <span class="category-title">TOTAL PER PERSON</span>
                      <span class="category-desc">3 Days 2 Nights Package</span>
                    </div>
                  </td>
                  <td class="total-price">RM {{ calculateAveragePerPax() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 费用明细说明 -->
      <div class="breakdown-section">
        <h3>COST BREAKDOWN DETAILS</h3>
        <div class="breakdown-grid">
          <div class="breakdown-item">
            <div class="breakdown-header entertainment">
              <h4>ENTERTAINMENT ACTIVITIES</h4>
              <span class="breakdown-price">RM {{ calculateTotal('entertainment') }}</span>
            </div>
            <ul>
              <li>Snorkeling Equipment Rental</li>
              <li>Island Hopping Tour</li>
              <li>Jungle Trekking Guide</li>
              <li>Transportation to Sites</li>
              <li>Equipment and Safety Gear</li>
            </ul>
          </div>
          
          <div class="breakdown-item">
            <div class="breakdown-header hostel">
              <h4>ACCOMMODATION</h4>
              <span class="breakdown-price">RM {{ calculateTotal('hostel') }}</span>
            </div>
            <ul>
              <li>{{ getRoomDescription() }}</li>
              <li>2 Nights Stay</li>
              <li>Air-conditioned Rooms</li>
              <li>Free WiFi Access</li>
              <li>24/7 Security</li>
              <li>Basic Toiletries Provided</li>
            </ul>
          </div>
          
          <div class="breakdown-item">
            <div class="breakdown-header food">
              <h4>FOOD & BEVERAGE</h4>
              <span class="breakdown-price">RM {{ calculateTotal('f&b') }}</span>
            </div>
            <ul>
              <li>6 Meals Total (Breakfast, Lunch, Dinner)</li>
              <li>Local Cuisine Specialties</li>
              <li>Drinking Water Provided</li>
              <li>Welcome Drink</li>
              <li>Snacks During Activities</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 房间分配可视化 -->
      <div class="room-allocation">
        <h3>ROOM ALLOCATION</h3>
        <div class="rooms-container">
          <div v-for="(room, index) in allocatedRooms" :key="index" class="room-box">
            <div class="room-type-icon">
              <span v-if="room.type === 'single'">🛏️</span>
              <span v-else-if="room.type === 'double'">🛏️🛏️</span>
              <span v-else>🛏️🛏️🛏️</span>
            </div>
            <div class="room-details">
              <h4>{{ room.type.toUpperCase() }} ROOM</h4>
              <p>{{ room.capacity }} Person{{ room.capacity > 1 ? 's' : '' }}</p>
              <p class="room-price">RM {{ calculateRoomCost(room.type) }}</p>
            </div>
          </div>
        </div>
        <p class="allocation-note">Rooms are allocated to minimize costs while ensuring comfort.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripCalculator',
  data() {
    return {
      personCount: 1,
      // 基础价格
      basePrices: {
        entertainment: 550,  // 娱乐活动每人
        hostelSingle: 300,   // 单人房每人
        hostelDouble: 550,   // 双人房（总共）
        hostelTriple: 750,   // 三人房（总共）
        food: 250            // 餐饮每人
      },
      // 房间分配规则
      roomTypes: [
        { type: 'triple', capacity: 3, pricePerRoom: 750 },
        { type: 'double', capacity: 2, pricePerRoom: 550 },
        { type: 'single', capacity: 1, pricePerRoom: 300 }
      ]
    }
  },
  computed: {
    // 计算房间分配
    allocatedRooms() {
      let remaining = this.personCount;
      const rooms = [];
      
      // 尽量分配三人房
      while (remaining >= 3) {
        rooms.push({ type: 'triple', capacity: 3 });
        remaining -= 3;
      }
      
      // 然后分配双人房
      if (remaining === 2) {
        rooms.push({ type: 'double', capacity: 2 });
        remaining = 0;
      } else if (remaining === 1) {
        // 如果还剩1人，检查是否能重新分配
        if (rooms.length > 0 && rooms[rooms.length - 1].type === 'double') {
          // 把最后一个双人房换成两个单人房
          rooms.pop();
          rooms.push({ type: 'single', capacity: 1 });
          rooms.push({ type: 'single', capacity: 1 });
        } else {
          rooms.push({ type: 'single', capacity: 1 });
        }
        remaining = 0;
      }
      
      return rooms;
    }
  },
  methods: {
    // 增加人数
    increaseCount() {
      if (this.personCount < 50) {
        this.personCount++;
      }
    },
    
    // 减少人数
    decreaseCount() {
      if (this.personCount > 1) {
        this.personCount--;
      }
    },
    
    // 验证人数
    validateCount() {
      if (this.personCount < 1) {
        this.personCount = 1;
      } else if (this.personCount > 50) {
        this.personCount = 50;
      }
    },
    
    // 计算各项总费用
    calculateTotal(category) {
      switch (category) {
        case 'entertainment':
          return this.basePrices.entertainment * this.personCount;
        case 'hostel':
          return this.calculateHostelTotal();
        case 'f&b':
          return this.basePrices.food * this.personCount;
        default:
          return 0;
      }
    },
    
    // 计算住宿总费用
    calculateHostelTotal() {
      let total = 0;
      this.allocatedRooms.forEach(room => {
        total += this.calculateRoomCost(room.type);
      });
      return total;
    },
    
    // 计算单种房间的费用
    calculateRoomCost(roomType) {
      switch (roomType) {
        case 'single':
          return this.basePrices.hostelSingle;
        case 'double':
          return this.basePrices.hostelDouble;
        case 'triple':
          return this.basePrices.hostelTriple;
        default:
          return 0;
      }
    },
    
    // 计算每人平均住宿费用
    calculatePerPax() {
      const total = this.calculateHostelTotal();
      return Math.round(total / this.personCount);
    },
    
    // 计算每人平均总费用
    calculateAveragePerPax() {
      const entertainment = this.calculateTotal('entertainment');
      const hostel = this.calculateHostelTotal();
      const food = this.calculateTotal('f&b');
      const total = entertainment + hostel + food;
      return Math.round(total / this.personCount);
    },
    
    // 计算总费用
    calculateGrandTotal() {
      const entertainment = this.calculateTotal('entertainment');
      const hostel = this.calculateHostelTotal();
      const food = this.calculateTotal('f&b');
      return entertainment + hostel + food;
    },
    
    // 获取房间描述
    getRoomDescription(short = false) {
      if (short) {
        if (this.personCount === 1) return 'Single Room';
        const tripleCount = this.allocatedRooms.filter(r => r.type === 'triple').length;
        const doubleCount = this.allocatedRooms.filter(r => r.type === 'double').length;
        const singleCount = this.allocatedRooms.filter(r => r.type === 'single').length;
        
        const parts = [];
        if (tripleCount > 0) parts.push(`${tripleCount} Triple`);
        if (doubleCount > 0) parts.push(`${doubleCount} Double`);
        if (singleCount > 0) parts.push(`${singleCount} Single`);
        
        return parts.join(', ') + ' Room(s)';
      }
      
      const roomTypes = this.allocatedRooms.map(room => 
        `${room.capacity} person${room.capacity > 1 ? 's' : ''} (${room.type})`
      );
      
      if (roomTypes.length === 0) return 'No rooms allocated';
      if (roomTypes.length === 1) return `1 x ${roomTypes[0]} room`;
      
      return roomTypes.map((type, index) => 
        `${index + 1}. ${type} room`
      ).join('<br>');
    }
  },
  mounted() {
    // 初始验证
    this.validateCount();
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
  margin: 40px 0;
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
  padding: 20px;
  background-color: #f0f7ff;
  border-radius: 10px;
  border: 2px solid #e3f2fd;
}

.room-allocation h3 {
  color: #1e3c72;
  margin-bottom: 20px;
  text-align: center;
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
}
</style>