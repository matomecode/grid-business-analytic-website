:root {
  --primary: #0a2540;
  --accent: #00baff;
  --text: #ffffff;
  --gray: #d1dce5;
  --fade-time: 0.8s;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #ffffff;
  color: var(--primary);
  line-height: 1.6;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: var(--primary);
  color: var(--text);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar .logo {
  font-weight: 800;
  font-size: 1.5rem;
}

.navbar nav a {
  color: var(--gray);
  margin-left: 2rem;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.navbar nav a:hover {
  color: var(--accent);
}

.hero {
  text-align: center;
  padding: 10rem 5% 6rem;
  background: linear-gradient(145deg, var(--primary), #061e37);
  color: var(--text);
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
}

.hero p {
  margin-top: 1rem;
  font-size: 1.2rem;
}

.section {
  padding: 6rem 5%;
  text-align: center;
}

.features .cards {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.card {
  background: #f4f8fc;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
}

.btn {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  transition: background 0.3s;
}

.btn:hover {
  background: #009fdd;
}

.footer {
  text-align: center;
  padding: 2rem 5%;
  background: var(--primary);
  color: var(--gray);
  font-size: 0.9rem;
}

/* Animations */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp var(--fade-time) ease forwards;
}

.fade-in.delay-1 {
  animation-delay: 0.2s;
}

.fade-in.delay-2 {
  animation-delay: 0.4s;
}

.fade-in.delay-3 {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
