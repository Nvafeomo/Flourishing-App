import "../styles/MindfulnessPage.css";

export default function MindfulnessPage({ goToQuotes, handleLogout }) {
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
      {/* Foundations Section */}
      <section id="foundations">
  <h2 className="dimension-header">Foundations</h2>

  {/* Topic: Flourishing */}
  <div className="topic">
    <h3>Flourishing</h3>
    <p>Flourishing refers to our overall sense of well-being and growth...</p>

    <div className="takeaways">
      <ul>
        <li>Understanding the foundation of personal growth.</li>
        <li>Emphasis on resilience and adaptability.</li>
        <li>Building habits that foster long-term well-being.</li>
      </ul>
    </div>

    <div className="meditation">
      <h4>Meditation Practice</h4>
      <p>
        <a
          href="https://psu.instructure.com/courses/2366563/files/172836426/download?wrap=1"
          target="_blank"
        >
          Guided Flourishing Meditation
        </a>
      </p>
    </div>
  </div>

  {/* Topic: Transformation */}
  <div className="topic">
    <h3>Transformation</h3>
    <div className="description">
      <p>Transformation is the process of change that underpins our personal and communal evolution...</p>
    </div>
    <div className="takeaways">
      <ul>
        <li>Transformation begins with self-awareness.</li>
        <li>Contextualizes personal and societal change.</li>
        <li>Strategies for effective adaptation.</li>
      </ul>
    </div>
    <div className="meditation">
      <h4>Meditation Practice</h4>
      <p>
        <a
          href="https://www.youtube.com/watch?v=example2"
          target="_blank"
        >
          Transformation Meditation
        </a>
      </p>
    </div>
  </div>

  {/* Topic: Resilience */}
  <div className="topic">
    <h3>Resilience</h3>
    <div className="description">
      <p>Resilience is about bouncing back from setbacks and maintaining mental strength through challenges.</p>
    </div>
    <div className="takeaways">
      <ul>
        <li>Developing skills to overcome adversity.</li>
        <li>Building mental fortitude.</li>
        <li>Using challenges as stepping stones.</li>
      </ul>
    </div>
    <div className="meditation">
      <h4>Meditation Practice</h4>
      <p>
        <a
          href="https://www.youtube.com/watch?v=example3"
          target="_blank"
        >
          Resilience Meditation
        </a>
      </p>
    </div>
  </div>
</section>


  {/*Awareness Section*/}
  <section id="awareness">
    <h2 className="dimension-header">Awareness</h2>
    
    {/*Topic: Emotions*/}
    <div className="topic">
      <h3>Emotions</h3>
      <div className="description">
        <p>Emotions are at the heart of human experience. Understanding them helps us navigate both internal and external landscapes effectively.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Learning to identify and name different emotions.</li>
          <li>Understanding emotional triggers.</li>
          <li>Managing emotions in constructive ways.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example4" target="_blank">Emotional Awareness Meditation</a></p>
      </div>
    </div>

    {/*Topic: Focus*/}
    <div className="topic">
      <h3>Focus</h3>
      <div className="description">
        <p>Focus is the art of directing attention intentionally. It involves minimizing distractions and engaging with the present moment.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Techniques for building concentration.</li>
          <li>Mindfulness practices to enhance focus.</li>
          <li>Managing digital distractions.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example5" target="_blank">Focus Meditation</a></p>
      </div>
    </div>

    {/*Topic: Mindfulness*/}
    <div className="topic">
      <h3>Mindfulness</h3>
      <div className="description">
        <p>Mindfulness is the practice of being fully present, cultivating awareness and a non-judgmental attitude toward one's experiences.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Enhancing self-awareness through mindfulness.</li>
          <li>Adopting a non-judgmental perspective.</li>
          <li>Incorporating mindfulness into daily routines.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example6" target="_blank">Mindfulness Meditation</a></p>
      </div>
    </div>
  </section>

  {/*Connection Section*/}
  <section id="connection">
    <h2 className="dimension-header">Connection</h2>
    
    {/*Topic: Interdependence*/}
    <div className="topic">
      <h3>Interdependence</h3>
      <div className="description">
        <p>Interdependence highlights the interconnected nature of our relationships and communities.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Recognizing the value of community support.</li>
          <li>Understanding reciprocal relationships.</li>
          <li>Realizing the impact of social bonds on personal growth.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example7" target="_blank">Interdependence Meditation</a></p>
      </div>
    </div>

    {/*Topic: Compassion*/}
    <div className="topic">
      <h3>Compassion</h3>
      <div className="description">
        <p>Compassion involves understanding and empathizing with the challenges others face, fostering deep connections.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Practicing empathy towards oneself and others.</li>
          <li>Developing a compassionate mindset.</li>
          <li>Strengthening interpersonal bonds through kindness.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example8" target="_blank">Compassion Meditation</a></p>
      </div>
    </div>
    
    {/*Topic: Inclusion*/}
    <div className="topic">
      <h3>Inclusion</h3>
      <div className="description">
        <p>Inclusion is about valuing diversity and ensuring that every voice is heard within our communities.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Understanding the significance of inclusive practices.</li>
          <li>Strategies to ensure equal participation.</li>
          <li>Creating environments where everyone feels valued.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example9" target="_blank">Inclusion Meditation</a></p>
      </div>
    </div>
  </section>

  {/*Wisdom Section*/}
  <section id="wisdom">
    <h2 className="dimension-header">Wisdom</h2>
    
    {/*Topic: Identity*/}
    <div className="topic">
      <h3>Identity</h3>
      <div className="description">
        <p>Exploring identity involves understanding who we are and how our experiences shape us.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Discovering inner values and beliefs.</li>
          <li>Embracing self-reflection as a lifelong process.</li>
          <li>Recognizing the fluid nature of personal identity.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example10" target="_blank">Identity Meditation</a></p>
      </div>
    </div>

    {/*Topic: Values*/}
    <div className="topic">
      <h3>Values</h3>
      <div className="description">
        <p>Values serve as guiding principles that shape our decisions and behaviors.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Clarifying personal and shared values.</li>
          <li>Evaluating how values impact decision-making.</li>
          <li>Aligning actions with deeply held beliefs.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example11" target="_blank">Values Meditation</a></p>
      </div>
    </div>

    {/*Topic: Aesthetics*/}
    <div className="topic">
      <h3>Aesthetics</h3>
      <div className="description">
        <p>Aesthetics examines how art and beauty can inspire well-being and influence our life paths.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Appreciating everyday beauty.</li>
          <li>Connecting with art as a form of personal healing.</li>
          <li>Exploring the interplay between sensory experiences and well-being.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example12" target="_blank">Aesthetics Meditation</a></p>
      </div>
    </div>
  </section>

  {/*Integration Section*/}
  <section id="integration">
    <h2 className="dimension-header">Integration</h2>
    
    {/*Topic: Courage*/}
    <div className="topic">
      <h3>Courage</h3>
      <div className="description">
        <p>Courage involves stepping outside your comfort zone to apply your learning in meaningful ways.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Overcoming fear and embracing vulnerability.</li>
          <li>Practical strategies for bold action.</li>
          <li>Integrating insights into everyday challenges.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example13" target="_blank">Courage Meditation</a></p>
      </div>
    </div>

    {/*Topic: Community*/}
    <div className="topic">
      <h3>Community</h3>
      <div className="description">
        <p>Community is the culmination of your journey, emphasizing collective well-being and shared growth.</p>
      </div>
      <div className="takeaways">
        <ul>
          <li>Fostering supportive and inclusive networks.</li>
          <li>Sharing insights to benefit the collective.</li>
          <li>Recognizing the strength of communal ties.</li>
        </ul>
      </div>
      <div className="meditation">
        <h4>Meditation Practice</h4>
        <p><a href="https://www.youtube.com/watch?v=example14" target="_blank">Community Meditation</a></p>
      </div>
    </div>
  </section>
    

 
    {/* Navigation buttons */}
      <div style={{ textAlign: "center", padding: "2em" }}>
        <button onClick={goToQuotes}>Go to Quotes & Reflections</button>
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
      </div>
     
    </div>
  );
}