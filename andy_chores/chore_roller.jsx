import { useState, useEffect, useRef } from "react";

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const CHORES = [
  { name: "Take clean clothes upstairs", days: ["Friday","Saturday"], minTime: 0, category: "Laundry", rollable: false },
  { name: "Do Dishes", days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], minTime: 5, category: "Daily Clean Up After Yourself", rollable: true, timeDie: 6 },
  { name: "Have a snack", days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], minTime: 0, category: "Daily Clean Up After Yourself", rollable: false },
  { name: "Read", days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], minTime: 15, category: "Bettering Yourself", rollable: true, timeDie: 10 },
  { name: "Math Homework", days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], minTime: 0, category: "Bettering Yourself", rollable: false },
  { name: "Empty Backpack & Hang Up", days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], minTime: 0, category: "Daily Clean Up After Yourself", rollable: false },
  { name: "Clean and put away lunchbox & tupperware", days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], minTime: 0, category: "Daily Clean Up After Yourself", rollable: false },
  { name: "Practice Flute", days: ["Monday","Tuesday","Thursday","Friday","Saturday","Sunday"], minTime: 5, category: "Bettering Yourself", rollable: true, timeDie: 6 },
  { name: "Practice Drums", days: ["Tuesday","Wednesday","Thursday","Saturday","Sunday"], minTime: 10, category: "Bettering Yourself", rollable: true, timeDie: 6 },
  { name: "Pack a lunch", days: ["Monday","Tuesday","Wednesday","Thursday","Sunday"], minTime: 0, category: "Daily Clean Up After Yourself", rollable: false },
  { name: "Set Alarm", days: ["Monday","Tuesday","Wednesday","Thursday","Sunday"], minTime: 0, category: "Daily Clean Up After Yourself", rollable: false },
  { name: "Clean shoe rack", days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], minTime: 0, category: "Daily Clean Up After Yourself", rollable: false },
  { name: "Clean Light Switches", days: ["Wednesday"], minTime: 0, category: "Household Chores", rollable: false },
  { name: "Clean Doorknobs", days: ["Thursday"], minTime: 0, category: "Household Chores", rollable: false },
  { name: "Hang up drum sticks & headphones", days: ["Monday","Friday"], minTime: 0, category: "Daily Clean Up After Yourself", rollable: false },
  { name: "Hang up basketball bag", days: ["Thursday"], minTime: 0, category: "Daily Clean Up After Yourself", rollable: false },
  { name: "Take out garbages on 2nd floor", days: ["Tuesday"], minTime: 2, category: "Household Chores", rollable: true, timeDie: 4 },
  { name: "Pick up Basement", days: ["Tuesday","Friday"], minTime: 5, category: "Household Chores", rollable: true, timeDie: 6 },
  { name: "Clean Bedroom Desk Off", days: ["Wednesday","Thursday"], minTime: 5, category: "Big Take Care of Yourself Chores", rollable: true, timeDie: 4 },
  { name: "Clean Bedroom Floor", days: ["Tuesday","Saturday"], minTime: 5, category: "Big Take Care of Yourself Chores", rollable: true, timeDie: 4 },
  { name: "Dust Basement", days: ["Wednesday"], minTime: 2, category: "Household Chores", rollable: true, timeDie: 4 },
  { name: "Clean Bathroom sink and floor", days: ["Monday","Thursday"], minTime: 2, category: "Household Chores", rollable: true, timeDie: 6 },
  { name: "Clean Bedroom Closet", days: ["Wednesday","Saturday"], minTime: 5, category: "Big Take Care of Yourself Chores", rollable: true, timeDie: 6 },
  { name: "Set out Clothes for Tomorrow", days: ["Monday","Tuesday","Wednesday","Thursday","Sunday"], minTime: 0, category: "Daily Clean Up After Yourself", rollable: false },
  { name: "Put away clean clothes in bins", days: ["Saturday","Sunday"], minTime: 3, category: "Laundry", rollable: true, timeDie: 4 },
  { name: "Hang up clean clothes in closet", days: ["Saturday","Sunday"], minTime: 5, category: "Laundry", rollable: true, timeDie: 4 },
  { name: "Fold clean socks", days: ["Friday","Saturday"], minTime: 2, category: "Laundry", rollable: true, timeDie: 4 },
  { name: "Do a weekend chore", days: ["Saturday","Sunday"], minTime: 5, category: "Household Chores", rollable: true, timeDie: 8 },
  { name: "Clean a litter box", days: ["Monday","Friday"], minTime: 2, category: "Household Chores", rollable: true, timeDie: 4 },
];

const CATEGORY_CONFIG = {
  "Bettering Yourself":              { color: "#4ade80", bg: "#052e16", icon: "⭐", choreDie: 6 },
  "Household Chores":                { color: "#fb923c", bg: "#431407", icon: "🏠", choreDie: 8 },
  "Big Take Care of Yourself Chores":{ color: "#a78bfa", bg: "#2e1065", icon: "💪", choreDie: 6 },
  "Laundry":                         { color: "#60a5fa", bg: "#172554", icon: "👕", choreDie: 4 },
  "Daily Clean Up After Yourself":   { color: "#f9a8d4", bg: "#4a044e", icon: "✅", choreDie: null },
};

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function DieIcon({ sides, value, rolling, color }) {
  const faces = { 4:"▲", 6:"⬡", 8:"◆", 10:"⬟", 20:"★" };
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center", gap:4
    }}>
      <div style={{
        width:72, height:72, borderRadius: sides === 4 ? "12px" : "50%",
        background: `radial-gradient(circle at 35% 35%, ${color}44, ${color}11)`,
        border: `2px solid ${color}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize: value ? 28 : 20,
        color: color,
        boxShadow: `0 0 20px ${color}44`,
        transition: "all 0.1s",
        transform: rolling ? `rotate(${Math.random()*40-20}deg) scale(1.05)` : "none",
        fontFamily:"'Fredoka One', cursive",
      }}>
        {value || faces[sides] || "⬡"}
      </div>
      <span style={{ color:"#888", fontSize:11, fontFamily:"monospace" }}>d{sides}</span>
    </div>
  );
}

function ChoreCard({ chore, rolled, timeRoll }) {
  const cfg = CATEGORY_CONFIG[chore.category];
  const totalTime = chore.rollable && chore.minTime ? chore.minTime + timeRoll : null;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${cfg.bg}cc, #0f0f1a)`,
      border: `1px solid ${cfg.color}44`,
      borderRadius: 16,
      padding: "20px 24px",
      marginBottom: 12,
      position:"relative",
      overflow:"hidden",
      boxShadow: rolled ? `0 0 24px ${cfg.color}33` : "none",
      transform: rolled ? "scale(1.01)" : "scale(1)",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:3,
        background: cfg.color, opacity: rolled ? 1 : 0.3,
      }}/>
      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
        <span style={{ fontSize:28, flexShrink:0 }}>{cfg.icon}</span>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{
            fontSize:16, fontWeight:700, color: rolled ? "#fff" : "#aaa",
            fontFamily:"'Fredoka One', cursive", lineHeight:1.2, marginBottom:4,
          }}>
            {chore.name}
          </div>
          <div style={{ fontSize:11, color: cfg.color, opacity:0.8, marginBottom: totalTime ? 8 : 0 }}>
            {chore.category}
          </div>
          {totalTime && (
            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:`${cfg.color}22`, borderRadius:20, padding:"4px 10px",
              fontSize:13, color: cfg.color, fontWeight:700,
            }}>
              ⏱ {chore.minTime} min + {timeRoll} = <strong>{totalTime} min</strong>
            </div>
          )}
          {!chore.rollable && (
            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:"#ffffff11", borderRadius:20, padding:"4px 10px",
              fontSize:12, color:"#888",
            }}>
              ✓ Complete when done
            </div>
          )}
          {chore.rollable && chore.minTime === 0 && (
            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:`${cfg.color}22`, borderRadius:20, padding:"4px 10px",
              fontSize:12, color: cfg.color,
            }}>
              ⏱ Do your best!
            </div>
          )}
        </div>
        {rolled && (
          <div style={{
            width:36, height:36, borderRadius:"50%",
            background: cfg.color, display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:18, flexShrink:0,
            boxShadow:`0 0 12px ${cfg.color}88`,
          }}>🎲</div>
        )}
      </div>
    </div>
  );
}

export default function ChoreRoller() {
  const today = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const [selectedDay, setSelectedDay] = useState(today);
  const [phase, setPhase] = useState("idle"); // idle | rolling | result
  const [rollingAnim, setRollingAnim] = useState(false);
  const [choreRoll, setChoreRoll] = useState(null);
  const [timeRoll, setTimeRoll] = useState(null);
  const [selectedChore, setSelectedChore] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [completedChores, setCompletedChores] = useState([]);
  const [animStep, setAnimStep] = useState(0);
  const intervalRef = useRef(null);

  const todaysChores = CHORES.filter(c => c.days.includes(selectedDay));
  const rollableChores = todaysChores.filter(c => c.rollable);
  const checkboxChores = todaysChores.filter(c => !c.rollable);

  // Group rollable chores by category
  const byCategory = {};
  rollableChores.forEach(c => {
    if (!byCategory[c.category]) byCategory[c.category] = [];
    byCategory[c.category].push(c);
  });
  const categories = Object.keys(byCategory);

  function startRoll() {
    setPhase("rolling");
    setChoreRoll(null);
    setTimeRoll(null);
    setSelectedChore(null);
    setSelectedCategory(null);
    setAnimStep(0);
    setRollingAnim(true);

    // Animate for 1.5s then resolve
    let count = 0;
    intervalRef.current = setInterval(() => {
      count++;
      setAnimStep(count);
      if (count > 12) {
        clearInterval(intervalRef.current);
        resolveRoll();
      }
    }, 120);
  }

  function resolveRoll() {
    setRollingAnim(false);
    // Pick a random rollable chore
    if (rollableChores.length === 0) return;
    const idx = Math.floor(Math.random() * rollableChores.length);
    const chore = rollableChores[idx];
    const cfg = CATEGORY_CONFIG[chore.category];
    const choreDieResult = rollDie(cfg.choreDie || 6);
    const timeDieResult = chore.timeDie ? rollDie(chore.timeDie) : null;

    setChoreRoll(choreDieResult);
    setTimeRoll(timeDieResult);
    setSelectedChore(chore);
    setSelectedCategory(chore.category);
    setPhase("result");
  }

  function toggleComplete(choreName) {
    setCompletedChores(prev =>
      prev.includes(choreName) ? prev.filter(c => c !== choreName) : [...prev, choreName]
    );
  }

  const cfg = selectedCategory ? CATEGORY_CONFIG[selectedCategory] : null;

  return (
    <div style={{
      minHeight:"100vh",
      background: "linear-gradient(135deg, #0a0a14 0%, #0f0f1a 50%, #0a0a14 100%)",
      fontFamily:"'Segoe UI', sans-serif",
      color:"#fff",
      padding:"24px 16px",
      maxWidth:600,
      margin:"0 auto",
    }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ fontSize:42, marginBottom:4 }}>🎲</div>
        <h1 style={{
          fontFamily:"'Fredoka One', cursive",
          fontSize:32, margin:0, letterSpacing:1,
          background:"linear-gradient(90deg, #a78bfa, #60a5fa, #4ade80)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        }}>Chore Quest</h1>
        <p style={{ color:"#666", fontSize:13, margin:"4px 0 0" }}>Roll the dice. Do the thing. Be legendary.</p>
      </div>

      {/* Day Selector */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:11, color:"#666", textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>Select Day</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {DAYS.map(day => (
            <button key={day} onClick={() => { setSelectedDay(day); setPhase("idle"); }}
              style={{
                padding:"6px 12px", borderRadius:20, border:"none", cursor:"pointer",
                fontSize:12, fontWeight:600, transition:"all 0.2s",
                background: selectedDay === day ? "#a78bfa" : "#1a1a2e",
                color: selectedDay === day ? "#fff" : "#888",
                boxShadow: selectedDay === day ? "0 0 12px #a78bfa66" : "none",
              }}>
              {day.slice(0,3)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Bar */}
      <div style={{
        display:"flex", gap:10, marginBottom:24,
        background:"#1a1a2e", borderRadius:12, padding:"12px 16px",
      }}>
        <div style={{ flex:1, textAlign:"center" }}>
          <div style={{ fontSize:22, fontWeight:800, color:"#a78bfa", fontFamily:"'Fredoka One', cursive" }}>{todaysChores.length}</div>
          <div style={{ fontSize:10, color:"#666" }}>Total Chores</div>
        </div>
        <div style={{ width:1, background:"#333" }}/>
        <div style={{ flex:1, textAlign:"center" }}>
          <div style={{ fontSize:22, fontWeight:800, color:"#fb923c", fontFamily:"'Fredoka One', cursive" }}>{rollableChores.length}</div>
          <div style={{ fontSize:10, color:"#666" }}>Rollable</div>
        </div>
        <div style={{ width:1, background:"#333" }}/>
        <div style={{ flex:1, textAlign:"center" }}>
          <div style={{ fontSize:22, fontWeight:800, color:"#4ade80", fontFamily:"'Fredoka One', cursive" }}>{completedChores.length}</div>
          <div style={{ fontSize:10, color:"#666" }}>Done</div>
        </div>
      </div>

      {/* Roll Button */}
      {rollableChores.length > 0 && (
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <button onClick={startRoll} disabled={phase === "rolling"}
            style={{
              padding:"16px 40px", borderRadius:50, border:"none", cursor: phase === "rolling" ? "default" : "pointer",
              fontSize:18, fontWeight:800, fontFamily:"'Fredoka One', cursive",
              background: phase === "rolling"
                ? "linear-gradient(90deg, #333, #444)"
                : "linear-gradient(90deg, #a78bfa, #60a5fa)",
              color:"#fff",
              boxShadow: phase === "rolling" ? "none" : "0 0 32px #a78bfa66, 0 4px 20px #00000088",
              transform: phase === "rolling" ? "scale(0.97)" : "scale(1)",
              transition:"all 0.2s",
              letterSpacing:1,
            }}>
            {phase === "rolling" ? "🎲 Rolling..." : phase === "result" ? "🎲 Roll Again!" : "🎲 Roll for Chore!"}
          </button>
        </div>
      )}

      {/* Rolling Animation */}
      {phase === "rolling" && (
        <div style={{
          background:"#1a1a2e", borderRadius:16, padding:24,
          textAlign:"center", marginBottom:24,
          border:"1px solid #333",
        }}>
          <div style={{ display:"flex", justifyContent:"center", gap:24, flexWrap:"wrap" }}>
            <DieIcon sides={8} value={rollingAnim ? rollDie(8) : null} rolling={true} color="#a78bfa"/>
            <DieIcon sides={6} value={rollingAnim ? rollDie(6) : null} rolling={true} color="#60a5fa"/>
          </div>
          <div style={{ marginTop:16, color:"#666", fontSize:13 }}>The dice are deciding your fate...</div>
        </div>
      )}

      {/* Result */}
      {phase === "result" && selectedChore && cfg && (
        <div style={{
          background:`linear-gradient(135deg, ${cfg.bg}, #0f0f1a)`,
          border:`1px solid ${cfg.color}66`,
          borderRadius:20, padding:24, marginBottom:24,
          boxShadow:`0 0 40px ${cfg.color}22`,
        }}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:13, color:cfg.color, textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>
              {cfg.icon} Your Chore Quest
            </div>
            <div style={{
              fontSize:24, fontWeight:800, color:"#fff",
              fontFamily:"'Fredoka One', cursive", lineHeight:1.2, marginBottom:12,
            }}>
              {selectedChore.name}
            </div>
            <div style={{
              display:"inline-block", background:`${cfg.color}22`,
              borderRadius:20, padding:"4px 14px", fontSize:12, color:cfg.color,
            }}>
              {selectedChore.category}
            </div>
          </div>

          {/* Dice Results */}
          <div style={{ display:"flex", justifyContent:"center", gap:32, marginBottom:20 }}>
            <div style={{ textAlign:"center" }}>
              <DieIcon sides={CATEGORY_CONFIG[selectedChore.category].choreDie || 6} value={choreRoll} rolling={false} color={cfg.color}/>
              <div style={{ fontSize:11, color:"#666", marginTop:4 }}>Chore Roll</div>
            </div>
            {selectedChore.timeDie && (
              <div style={{ textAlign:"center" }}>
                <DieIcon sides={selectedChore.timeDie} value={timeRoll} rolling={false} color={cfg.color}/>
                <div style={{ fontSize:11, color:"#666", marginTop:4 }}>Time Roll</div>
              </div>
            )}
          </div>

          {/* Time Result */}
          {selectedChore.minTime > 0 && timeRoll && (
            <div style={{
              background:"#00000033", borderRadius:12, padding:"12px 16px",
              textAlign:"center", marginBottom:16,
            }}>
              <span style={{ color:"#888", fontSize:14 }}>
                {selectedChore.minTime} min minimum
              </span>
              <span style={{ color:"#555", margin:"0 8px" }}>+</span>
              <span style={{ color:cfg.color, fontSize:14, fontWeight:700 }}>
                {timeRoll} min rolled
              </span>
              <span style={{ color:"#555", margin:"0 8px" }}>=</span>
              <span style={{
                color:"#fff", fontSize:20, fontWeight:800,
                fontFamily:"'Fredoka One', cursive",
              }}>
                {selectedChore.minTime + timeRoll} min total
              </span>
            </div>
          )}

          <button onClick={() => toggleComplete(selectedChore.name)}
            style={{
              width:"100%", padding:"12px", borderRadius:12, border:"none",
              cursor:"pointer", fontSize:15, fontWeight:700,
              fontFamily:"'Fredoka One', cursive", letterSpacing:0.5,
              background: completedChores.includes(selectedChore.name)
                ? "#4ade8044" : cfg.color,
              color: completedChores.includes(selectedChore.name) ? "#4ade80" : "#000",
              transition:"all 0.2s",
            }}>
            {completedChores.includes(selectedChore.name) ? "✅ Completed! Nice work!" : "Mark as Complete"}
          </button>
        </div>
      )}

      {/* Checkbox Chores */}
      {checkboxChores.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:11, color:"#666", textTransform:"uppercase", letterSpacing:2, marginBottom:12 }}>
            ✅ Checkbox Chores — Just Do 'Em
          </div>
          {checkboxChores.map(chore => {
            const done = completedChores.includes(chore.name);
            const choreCfg = CATEGORY_CONFIG[chore.category];
            return (
              <div key={chore.name} onClick={() => toggleComplete(chore.name)}
                style={{
                  display:"flex", alignItems:"center", gap:12,
                  background: done ? "#0a2010" : "#1a1a2e",
                  border: `1px solid ${done ? "#4ade8044" : "#333"}`,
                  borderRadius:12, padding:"12px 16px", marginBottom:8,
                  cursor:"pointer", transition:"all 0.2s",
                }}>
                <div style={{
                  width:22, height:22, borderRadius:6, flexShrink:0,
                  border:`2px solid ${done ? "#4ade80" : "#555"}`,
                  background: done ? "#4ade80" : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:13, transition:"all 0.2s",
                }}>
                  {done ? "✓" : ""}
                </div>
                <span style={{ fontSize:13, color: done ? "#4ade80" : "#ccc",
                  textDecoration: done ? "line-through" : "none",
                  transition:"all 0.2s" }}>
                  {choreCfg.icon} {chore.name}
                </span>
                <span style={{
                  marginLeft:"auto", fontSize:10, color:"#555",
                  background:"#0f0f1a", padding:"2px 8px", borderRadius:10,
                }}>
                  {chore.category.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* All Done State */}
      {completedChores.length === todaysChores.length && todaysChores.length > 0 && (
        <div style={{
          textAlign:"center", padding:24,
          background:"linear-gradient(135deg, #052e16, #0f0f1a)",
          border:"1px solid #4ade8044", borderRadius:20,
          boxShadow:"0 0 40px #4ade8022",
        }}>
          <div style={{ fontSize:48 }}>🏆</div>
          <div style={{
            fontSize:24, fontFamily:"'Fredoka One', cursive",
            color:"#4ade80", marginTop:8,
          }}>All Chores Complete!</div>
          <div style={{ color:"#666", fontSize:13, marginTop:4 }}>
            You crushed it today. Legendary status achieved.
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        * { box-sizing: border-box; }
        button:active { transform: scale(0.96) !important; }
      `}</style>
    </div>
  );
}
