import "../styles/MindfulnessPage.css";

export default function MindfulnessPage() {
  return (
    <div>
      <header>
        <h1>Human Flourishing Course Reflection</h1>
        <p>Five Dimensions of Flourishing</p>
      </header>

      <nav>
        <ul>
          <li><a href="#foundations">Foundations</a></li>
          <li><a href="#awareness">Awareness</a></li>
          <li><a href="#connection">Connection</a></li>
          <li><a href="#wisdom">Wisdom</a></li>
          <li><a href="#integration">Integration</a></li>
        </ul>
      </nav>

      <section id="foundations">
        <h2 className="dimension-header">Foundations</h2>
        <div className="topic">
          <h3>Flourishing</h3>
          <p>Flourishing refers to our overall sense of well-being and growth...</p>
        </div>
        {/* Add all your other topics here exactly as before */}
      </section>
    </div>
  );
}
