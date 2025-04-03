class AlarmService {
    constructor() {
      this.alarms = {};
      this.audioElements = {};
      this.checkAlarmsInterval = null;
    }
  
    init() {
      // Preload audio files
      this.audioElements['default'] = new Audio('/sounds/alarm1.mp3');
      this.audioElements['alarm1'] = new Audio('/sounds/alarm1.mp3');
      this.audioElements['alarm2'] = new Audio('/sounds/alarm2.mp3');
      
      // Start checking for alarms every minute
      this.checkAlarmsInterval = setInterval(() => this.checkAlarms(), 60000);
    }
  
    setAlarms(todos) {
      this.alarms = {};
      todos.forEach(todo => {
        if (todo.alarm_enabled && todo.start_time) {
          this.alarms[todo.id] = {
            time: todo.start_time,
            sound: todo.alarm_sound,
            task: todo.task
          };
        }
      });
    }
  
    checkAlarms() {
      const now = new Date();
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentHours}:${currentMinutes}`;
  
      Object.entries(this.alarms).forEach(([id, alarm]) => {
        if (alarm.time === currentTime) {
          this.triggerAlarm(alarm.sound, alarm.task);
        }
      });
    }
  
    triggerAlarm(soundType, taskName) {
      const audio = this.audioElements[soundType] || this.audioElements['default'];
      audio.currentTime = 0;
      audio.play();
      
      // Show notification if browser supports it
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`Time for: ${taskName}`, {
          body: `It's time to work on your task!`,
          icon: '/logo192.png'
        });
      }
    }
  
    cleanup() {
      clearInterval(this.checkAlarmsInterval);
    }
  }
  
  export const alarmService = new AlarmService();