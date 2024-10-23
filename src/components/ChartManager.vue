<!-- Remplacez uniquement votre template, en gardant tout le script intact -->
<template>
  <div>
    <h1>Time Management and Work Conditions Overview</h1>

    <!-- Nouvelles Quick Stats -->
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h4>Total Employees</h4>
          <div class="stat-value">248</div>
          <div class="stat-change positive">+12% ↑</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">⏰</div>
        <div class="stat-content">
          <h4>Avg. Working Hours</h4>
          <div class="stat-value">7.5h</div>
          <div class="stat-change negative">-2% ↓</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h4>Productivity Rate</h4>
          <div class="stat-value">92%</div>
          <div class="stat-change positive">+5% ↑</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-content">
          <h4>Goals Completed</h4>
          <div class="stat-value">85%</div>
          <div class="stat-change positive">+8% ↑</div>
        </div>
      </div>
    </div>
    
    <!-- Div fixe existante avec ajouts -->
    <div class="fixed-div">
      <h3>Méteo</h3>
      <Meteo />
      
      <!-- Nouvelle section notifications -->
      <div class="notifications-section">
        <h4>Recent Updates</h4>
        <ul class="notifications-list">
          <li>
            <span class="notification-dot"></span>
            New schedule published
          </li>
          <li>
            <span class="notification-dot"></span>
            Team meeting at 2 PM
          </li>
          <li>
            <span class="notification-dot"></span>
            3 new time-off requests
          </li>
        </ul>
      </div>
    </div>

    <!-- Vos graphiques existants -->
    <div class="card-container">
      <!-- Vos cards existantes -->
      <div class="card">
        <div class="card-header">
          <h3>Work Hours Distribution by Category</h3>
        </div>
        <div class="card-body">
          <canvas id="bar-chart" class="bar" />
          <p>
            This bar chart displays the distribution of work hours among employees, managers, 
            and the general manager.
          </p>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3>Employee Performance Over Time</h3>
        </div>
        <div class="card-body">
          <canvas id="line-chart" class="line" />
          <p>
            This line chart tracks the daily and weekly performance of employees over a selected 
            period.
          </p>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3>Complaints and Work Conditions Breakdown</h3>
        </div>
        <div class="card-body">
          <canvas id="pie-chart" class="pie" />
          <p>
            Work conditions employee complaints.
          </p>
        </div>
      </div>

      <!-- Nouvelles cards supplémentaires -->
      <div class="card schedule-card">
        <div class="card-header">
          <h3>Today's Schedule</h3>
        </div>
        <div class="card-body">
          <div class="schedule-list">
            <div class="schedule-item">
              <span class="time">09:00</span>
              <span class="event">Team Standup</span>
              <span class="status pending">Pending</span>
            </div>
            <div class="schedule-item">
              <span class="time">11:00</span>
              <span class="event">Project Review</span>
              <span class="status confirmed">Confirmed</span>
            </div>
            <div class="schedule-item">
              <span class="time">14:00</span>
              <span class="event">Client Meeting</span>
              <span class="status confirmed">Confirmed</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card kpi-card">
        <div class="card-header">
          <h3>Key Metrics</h3>
        </div>
        <div class="card-body">
          <div class="kpi-grid">
            <div class="kpi-item">
              <div class="kpi-label">Overtime Hours</div>
              <div class="kpi-value">124h</div>
              <div class="kpi-change negative">+12%</div>
            </div>
            <div class="kpi-item">
              <div class="kpi-label">Time Off</div>
              <div class="kpi-value">85h</div>
              <div class="kpi-change positive">-5%</div>
            </div>
            <div class="kpi-item">
              <div class="kpi-label">Late Arrivals</div>
              <div class="kpi-value">8%</div>
              <div class="kpi-change positive">-2%</div>
            </div>
            <div class="kpi-item">
              <div class="kpi-label">Early Leaves</div>
              <div class="kpi-value">5%</div>
              <div class="kpi-change neutral">0%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Ajoutez ces styles à votre section style existante -->
<style scoped>
/* Vos styles existants restent inchangés */

/* Nouveaux styles pour les stats rapides */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 0 auto 2rem;
  padding: 0 20px;
  max-width: 1600px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
}

.stat-content h4 {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0.25rem 0;
}

.stat-change {
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

/* Styles pour les notifications */
.notifications-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.notifications-section h4 {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.75rem 0;
}

.notifications-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notifications-list li {
  font-size: 0.875rem;
  color: #0f172a;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
}

.notification-dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  margin-right: 0.75rem;
}

/* Styles pour le schedule */
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.schedule-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
}

.time {
  font-weight: 500;
  color: #64748b;
  font-size: 0.875rem;
}

.event {
  color: #0f172a;
  font-size: 0.875rem;
}

.status {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.status.pending {
  background: #fef3c7;
  color: #92400e;
}

.status.confirmed {
  background: #dcfce7;
  color: #166534;
}

/* Styles pour les KPIs */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.kpi-item {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 6px;
}

.kpi-label {
  font-size: 0.875rem;
  color: #64748b;
}

.kpi-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0.25rem 0;
}

.kpi-change {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Media queries supplémentaires */
@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 10px;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .schedule-item {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>  