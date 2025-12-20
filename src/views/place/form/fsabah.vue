<template>
  <div class="form-container">
    <div class="header">
      <h1>INFOMATION FORM (SABAH)</h1>
    </div>
    
    <form @submit.prevent="submitForm" class="information-form">
      <div class="form-group">
        <label for="name">NAME:</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name"
          placeholder="Enter your name"
          required
        >
      </div>

      <div class="form-group">
        <label for="date">DATE:</label>
        <input 
          type="date" 
          id="date" 
          v-model="formData.date"
          required
        >
      </div>

      <div class="form-group">
        <label for="time">TIME:</label>
        <input 
          type="time" 
          id="time" 
          v-model="formData.time"
          required
        >
      </div>

      <div class="form-group">
        <label for="personCount">HOW MANY PERSON:</label>
        <input 
          type="number" 
          id="personCount" 
          v-model="formData.personCount"
          placeholder="Number of persons"
          min="1"
          max="50"
          required
        >
      </div>

      <div class="form-group">
        <label>EMPLOYEE:</label>
        <div class="employee-display">
          <div class="employee-placeholder">
            Will be randomly assigned after submission
          </div>
          <div class="employee-list-hint">
            Available employees: jack, qi, qun, kj, jeff
          </div>
        </div>
      </div>

      <button type="submit" class="submit-btn">
        SUBMIT
      </button>
    </form>

    <div class="footer-note">
      <p>Your Candy profile name will be dated. Since admin generals</p>
    </div>

    <!-- 表单提交后的确认对话框 -->
    <div v-if="showConfirmation" class="confirmation-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Form Submitted Successfully!</h3>
        </div>
        <div class="modal-body">
          <div class="submitted-info">
            <div class="info-row">
              <span class="info-label">Name:</span>
              <span class="info-value">{{ submittedData.name }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Date:</span>
              <span class="info-value">{{ submittedData.date }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Time:</span>
              <span class="info-value">{{ submittedData.time }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">How many people:</span>
              <span class="info-value">{{ submittedData.personCount }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Assign employee:</span>
              <span class="info-value employee-highlight">{{ assignedEmployee }}</span>
            </div>
          </div>
        </div>
        <router-link to="/csabah"><button @click="closeConfirmation" class="close-btn">OK</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationForm',
  data() {
    return {
      formData: {
        name: '',
        date: this.getTodayDate(),
        time: this.getCurrentTime(),
        personCount: '',
      },
      employees: ['jack', 'qi', 'qun', 'kj', 'jeff'],
      showConfirmation: false,
      assignedEmployee: '',
      submittedData: {}
    }
  },
  methods: {
    getTodayDate() {
      const today = new Date();
      return today.toISOString().split('T')[0];
    },
    
    getCurrentTime() {
      const now = new Date();
      return now.getHours().toString().padStart(2, '0') + ':' + 
             now.getMinutes().toString().padStart(2, '0');
    },
    
    getRandomEmployee() {
      const randomIndex = Math.floor(Math.random() * this.employees.length);
      return this.employees[randomIndex];
    },
    
    submitForm() {
      // 保存提交的数据
      this.submittedData = { ...this.formData };
      
      // 随机分配员工
      this.assignedEmployee = this.getRandomEmployee();
      
      // 在实际应用中，这里可以发送数据到服务器
      console.log('Form submitted:', this.formData);
      console.log('Assigned employee:', this.assignedEmployee);
      
      // 显示确认对话框
      this.showConfirmation = true;
      
      // 重置表单
      this.formData = {
        name: '',
        date: this.getTodayDate(),
        time: this.getCurrentTime(),
        personCount: '',
      };
    },
    
    closeConfirmation() {
      this.showConfirmation = false;
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
}

.header h1 {
  color: #333;
  font-size: 24px;
  margin: 0;
}

.information-form {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.employee-display {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  border: 1px dashed #ccc;
}

.employee-placeholder {
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
}

.employee-list-hint {
  font-size: 14px;
  color: #888;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #45a049;
}

.submit-btn:active {
  transform: translateY(1px);
}

.footer-note {
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
  font-size: 14px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

/* 确认对话框样式 */
.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 40px 30px 30px 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  width: 90%;
}

.modal-header h3 {
  color: #00a8a8; /* 青色 */
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
}

.submitted-info {
  text-align: left;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 25px;
  border: 1px solid #eee;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: bold;
  color: #555;
  min-width: 150px;
}

.info-value {
  color: #333;
  text-align: right;
  font-weight: 500;
}

.employee-highlight {
  color: #2196F3;
  font-weight: bold;
  font-size: 18px;
  background-color: #e3f2fd;
  padding: 5px 15px;
  border-radius: 4px;
  display: inline-block;
}

.close-btn {
  margin-top: 10px;
  padding: 12px 50px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  min-width: 150px;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: #45a049;
}

.close-btn:active {
  transform: translateY(1px);
}

/* 响应式设计 */
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
  
  .modal-content {
    padding: 30px 20px 20px 20px;
    width: 95%;
  }
  
  .info-label {
    min-width: 130px;
    font-size: 14px;
  }
  
  .info-value {
    font-size: 14px;
  }
  
  .employee-highlight {
    font-size: 16px;
  }
  
  .close-btn {
    padding: 10px 30px;
    min-width: 120px;
  }
}
</style>