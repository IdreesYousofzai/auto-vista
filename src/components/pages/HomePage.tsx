{/* RACING TRACK BACKGROUND - DODGE THE DEBRIS GAME */}
<section
  className="w-full py-32 relative overflow-hidden cursor-none"
  onMouseMove={(e) => {
    const section = e.currentTarget;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    section.style.setProperty('--mouse-x', `${x}px`);
    section.style.setProperty('--mouse-y', `${y}px`);

    // Update car position for game
    if (gameActive) {
      const carX = Math.min(Math.max(x, 80), rect.width - 80);
      setCarPosition({ x: carX, y: rect.height - 120 });
    }
  }}
  onMouseLeave={() => {
    setGameActive(false);
    setGameStarted(false);
  }}
>
  {/* Game State Management */}
  {(() => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
      const saved = localStorage.getItem('velocityGameHighScore');
      return saved ? parseInt(saved) : 0;
    });
    const [lives, setLives] = useState(3);
    const [carPosition, setCarPosition] = useState({ x: 400, y: 400 });
    const [obstacles, setObstacles] = useState<Array<{
      id: number;
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      type: 'tire' | 'cone' | 'barrel' | 'oil' | 'engine' | 'door';
    }>>([]);
    const [powerUps, setPowerUps] = useState<Array<{
      id: number;
      x: number;
      y: number;
      type: 'shield' | 'slowmo' | 'extraLife';
    }>>([]);
    const [shieldActive, setShieldActive] = useState(false);
    const [slowMoActive, setSlowMoActive] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const obstacleIdRef = useRef(0);
    const powerUpIdRef = useRef(0);
    const animationFrameRef = useRef<number>();
    const lastSpawnRef = useRef(0);
    const lastPowerUpSpawnRef = useRef(0);

    // Game loop
    useEffect(() => {
      if (!gameActive || gameOver) return;

      const gameLoop = (timestamp: number) => {
        if (!gameActive) return;

        // Spawn obstacles
        if (timestamp - lastSpawnRef.current > (slowMoActive ? 400 : 200)) {
          const types: ('tire' | 'cone' | 'barrel' | 'oil' | 'engine' | 'door')[] =
            ['tire', 'cone', 'barrel', 'oil', 'engine', 'door'];
          const type = types[Math.floor(Math.random() * types.length)];

          let width = 40;
          let height = 40;

          // Different sizes for different obstacles
          switch(type) {
            case 'tire': width = 45; height = 45; break;
            case 'cone': width = 30; height = 50; break;
            case 'barrel': width = 40; height = 60; break;
            case 'oil': width = 35; height = 35; break;
            case 'engine': width = 60; height = 50; break;
            case 'door': width = 50; height = 70; break;
          }

          setObstacles(prev => [...prev, {
            id: obstacleIdRef.current++,
            x: Math.random() * (window.innerWidth - 100),
            y: -50,
            width,
            height,
            speed: slowMoActive ? 2 + Math.random() * 2 : 4 + Math.random() * 4,
            type
          }]);
          lastSpawnRef.current = timestamp;
        }

        // Spawn power-ups
        if (timestamp - lastPowerUpSpawnRef.current > 5000 && Math.random() < 0.3) {
          const types: ('shield' | 'slowmo' | 'extraLife')[] = ['shield', 'slowmo', 'extraLife'];
          const type = types[Math.floor(Math.random() * types.length)];

          setPowerUps(prev => [...prev, {
            id: powerUpIdRef.current++,
            x: Math.random() * (window.innerWidth - 60),
            y: -40,
            type
          }]);
          lastPowerUpSpawnRef.current = timestamp;
        }

        // Move obstacles and check collisions
        setObstacles(prev => {
          const newObstacles = prev.map(obs => ({
            ...obs,
            y: obs.y + obs.speed
          })).filter(obs => obs.y < window.innerHeight + 100);

          // Check collisions
          newObstacles.forEach(obs => {
            if (
              !shieldActive &&
              obs.y + obs.height > carPosition.y &&
              obs.y < carPosition.y + 60 &&
              obs.x + obs.width > carPosition.x - 30 &&
              obs.x < carPosition.x + 30
            ) {
              // Collision detected
              setLives(prev => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                  setGameActive(false);
                  setGameOver(true);
                  if (score > highScore) {
                    setHighScore(score);
                    localStorage.setItem('velocityGameHighScore', score.toString());
                  }
                }
                return newLives;
              });

              // Remove the obstacle
              return newObstacles.filter(o => o.id !== obs.id);
            }
          });

          return newObstacles;
        });

        // Move power-ups and check collection
        setPowerUps(prev => {
          const newPowerUps = prev.map(pu => ({
            ...pu,
            y: pu.y + 3
          })).filter(pu => pu.y < window.innerHeight + 50);

          // Check collection
          newPowerUps.forEach(pu => {
            if (
              pu.y + 30 > carPosition.y &&
              pu.y < carPosition.y + 60 &&
              pu.x + 30 > carPosition.x - 30 &&
              pu.x < carPosition.x + 30
            ) {
              // Power-up collected
              switch(pu.type) {
                case 'shield':
                  setShieldActive(true);
                  setTimeout(() => setShieldActive(false), 5000);
                  break;
                case 'slowmo':
                  setSlowMoActive(true);
                  setTimeout(() => setSlowMoActive(false), 3000);
                  break;
                case 'extraLife':
                  setLives(prev => Math.min(prev + 1, 5));
                  break;
              }
              return newPowerUps.filter(p => p.id !== pu.id);
            }
          });

          return newPowerUps;
        });

        // Increase score over time
        setScore(prev => prev + 1);

        animationFrameRef.current = requestAnimationFrame(gameLoop);
      };

      animationFrameRef.current = requestAnimationFrame(gameLoop);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [gameActive, gameOver, carPosition, shieldActive, slowMoActive, score, highScore]);

    // Reset game
    const startGame = () => {
      setGameStarted(true);
      setGameActive(true);
      setGameOver(false);
      setScore(0);
      setLives(3);
      setObstacles([]);
      setPowerUps([]);
      setShieldActive(false);
      setSlowMoActive(false);
      obstacleIdRef.current = 0;
      powerUpIdRef.current = 0;
      lastSpawnRef.current = performance.now();
      lastPowerUpSpawnRef.current = performance.now();
    };

    return (
      <>
        {/* Racing Track Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 40px,
                rgba(239, 68, 68, 0.3) 40px,
                rgba(239, 68, 68, 0.3) 60px
              )`
            }}
            animate={{
              backgroundPositionY: ['0px', '100px']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Game UI - Only show when game is started */}
        {gameStarted && (
          <>
            {/* Score & Lives Display */}
            <div className="absolute top-10 left-10 z-50 flex items-center gap-8">
              <div className="bg-zinc-900/90 backdrop-blur-md border border-red-600/30 px-6 py-3 rounded-full">
                <span className="text-red-500 text-sm font-bold tracking-wider mr-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  SCORE:
                </span>
                <span className="text-white text-2xl font-black" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {score.toString().padStart(5, '0')}
                </span>
              </div>

              <div className="bg-zinc-900/90 backdrop-blur-md border border-red-600/30 px-6 py-3 rounded-full flex items-center gap-3">
                <span className="text-red-500 text-sm font-bold tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  LIVES:
                </span>
                {[...Array(lives)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: i * 0.1 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" fill="#EF4444" />
                    </svg>
                  </motion.div>
                ))}
              </div>

              <div className="bg-zinc-900/90 backdrop-blur-md border border-red-600/30 px-6 py-3 rounded-full">
                <span className="text-red-500 text-sm font-bold tracking-wider mr-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  HIGH SCORE:
                </span>
                <span className="text-white text-2xl font-black" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {highScore.toString().padStart(5, '0')}
                </span>
              </div>
            </div>

            {/* Power-up Status */}
            <div className="absolute top-10 right-10 z-50 flex flex-col gap-3">
              {shieldActive && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  className="bg-blue-500/90 backdrop-blur-md border border-blue-400 px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    SHIELD ACTIVE
                  </span>
                  <motion.div
                    className="w-12 h-1.5 bg-white/30 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>
              )}

              {slowMoActive && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  className="bg-purple-500/90 backdrop-blur-md border border-purple-400 px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    SLOW MOTION
                  </span>
                  <motion.div
                    className="w-12 h-1.5 bg-white/30 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        )}

        {/* Obstacles */}
        {obstacles.map(obs => (
          <motion.div
            key={obs.id}
            className="absolute"
            initial={{ y: -50, opacity: 1 }}
            animate={{ y: obs.y, x: obs.x }}
            transition={{ duration: 0.016 }}
          >
            {obs.type === 'tire' && (
              <div className="relative">
                <div className="w-11 h-11 bg-zinc-800 rounded-full border-4 border-zinc-600 flex items-center justify-center">
                  <div className="w-4 h-4 bg-zinc-600 rounded-full border-2 border-zinc-500" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  style={{ border: '2px dashed rgba(239, 68, 68, 0.5)' }}
                />
              </div>
            )}

            {obs.type === 'cone' && (
              <div className="w-8 h-12 relative">
                <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-orange-500" />
                <div className="w-4 h-4 bg-orange-600 rounded-full absolute -bottom-2 left-2" />
              </div>
            )}

            {obs.type === 'barrel' && (
              <div className="w-10 h-14 bg-red-800 rounded-full border-2 border-red-600 relative">
                <div className="absolute top-2 left-2 w-6 h-2 bg-red-600 rounded-full" />
                <div className="absolute bottom-2 left-2 w-6 h-2 bg-red-600 rounded-full" />
              </div>
            )}

            {obs.type === 'oil' && (
              <div className="w-9 h-9">
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full border-2 border-zinc-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-shimmer" />
                  <div className="absolute top-1 left-1 w-2 h-2 bg-zinc-600 rounded-full" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-zinc-600 rounded-full" />
                </div>
                <div className="text-center text-xs text-zinc-500 mt-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>OIL</div>
              </div>
            )}

            {obs.type === 'engine' && (
              <div className="w-14 h-12 bg-zinc-700 rounded-lg border-2 border-zinc-600 relative">
                <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-zinc-500 rounded-sm" />
                <div className="absolute top-2 right-2 w-4 h-1 bg-zinc-500 rounded-full" />
              </div>
            )}

            {obs.type === 'door' && (
              <div className="w-12 h-16 bg-blue-900 rounded border-2 border-blue-700 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-6 bg-blue-800 rounded-sm" />
                <div className="absolute left-1 top-1 w-1 h-1 bg-blue-400 rounded-full" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Power-ups */}
        {powerUps.map(pu => (
          <motion.div
            key={pu.id}
            className="absolute"
            initial={{ y: -30, opacity: 1, scale: 0 }}
            animate={{ y: pu.y, x: pu.x, scale: 1 }}
            transition={{ duration: 0.016 }}
          >
            {pu.type === 'shield' && (
              <div className="relative">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            )}

            {pu.type === 'slowmo' && (
              <div className="relative">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            )}

            {pu.type === 'extraLife' && (
              <div className="relative">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" fill="white" />
                  </svg>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            )}
          </motion.div>
        ))}

        {/* Player Car */}
        {gameActive && (
          <motion.div
            className="absolute pointer-events-none z-40"
            style={{
              left: carPosition.x,
              top: carPosition.y,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              x: carPosition.x,
              y: carPosition.y,
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              y: { type: "spring", stiffness: 300, damping: 30 },
              rotate: { duration: 0.5, repeat: Infinity }
            }}
          >
            {/* Shield effect */}
            {shieldActive && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: '100px',
                  height: '100px',
                  left: '-20px',
                  top: '-20px',
                  border: '3px solid rgba(59, 130, 246, 0.6)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}

            {/* Car SVG */}
            <svg width="60" height="40" viewBox="0 0 60 40" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444"/>
                  <stop offset="100%" stopColor="#DC2626"/>
                </linearGradient>
              </defs>
              <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 0.3, repeat: Infinity }}>
                <ellipse cx="30" cy="35" rx="25" ry="3" fill="rgba(0,0,0,0.3)" opacity="0.5"/>
                <path d="M15 25 L10 30 L50 30 L45 25 L40 15 L20 15 Z" fill="url(#carGradient)" stroke="#EF4444" strokeWidth="1.5"/>
                <rect x="22" y="17" width="7" height="6" fill="rgba(239, 68, 68, 0.3)" rx="1"/>
                <rect x="31" y="17" width="7" height="6" fill="rgba(239, 68, 68, 0.3)" rx="1"/>
                <circle cx="48" cy="28" r="2" fill="#FFD700">
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="12" cy="28" r="2" fill="#FF4444"/>
                <motion.circle
                  cx="20" cy="32" r="4"
                  fill="#333" stroke="#EF4444" strokeWidth="1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '20px 32px' }}
                />
                <motion.circle
                  cx="40" cy="32" r="4"
                  fill="#333" stroke="#EF4444" strokeWidth="1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '40px 32px' }}
                />
              </motion.g>
            </svg>

            {/* Exhaust effect */}
            <motion.div
              className="absolute right-full top-1/2 -translate-y-1/2"
              animate={{ opacity: [0, 0.8, 0], x: [10, -20] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            >
              <div className="flex flex-col gap-1">
                <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-red-500/80 rounded"/>
                <div className="h-0.5 w-6 bg-gradient-to-r from-transparent to-red-500/60 rounded"/>
                <div className="h-0.5 w-4 bg-gradient-to-r from-transparent to-red-500/40 rounded"/>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-md"
          >
            <div className="text-center">
              <motion.h2
                className="text-7xl font-black text-white mb-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
                animate={{
                  textShadow: ['0 0 20px rgba(239,68,68,0.5)', '0 0 40px rgba(239,68,68,0.8)', '0 0 20px rgba(239,68,68,0.5)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                GAME OVER
              </motion.h2>

              <div className="bg-zinc-900 border border-red-600/30 p-8 mb-8 rounded-lg">
                <p className="text-zinc-400 text-xl mb-4">Your Score</p>
                <p className="text-6xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {score.toString().padStart(5, '0')}
                </p>
                {score > highScore && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-yellow-500 text-lg font-bold mt-4"
                  >
                    🏆 NEW HIGH SCORE! 🏆
                  </motion.div>
                )}
              </div>

              <motion.button
                onClick={startGame}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-6 text-xl font-bold rounded-none border-b-4 border-red-900 hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                PLAY AGAIN
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Start Screen */}
        {!gameStarted && !gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <div className="text-center max-w-3xl mx-auto px-6">
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="mb-8"
              >
                <h2 className="text-6xl md:text-7xl font-black mb-6 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  DODGE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">DEBRIS</span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-zinc-300 mb-8 leading-relaxed"
              >
                Move your mouse to control the car. Avoid obstacles and collect power-ups!
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="grid grid-cols-3 gap-6 mb-12"
              >
                <div className="bg-zinc-900/80 backdrop-blur border border-red-600/30 p-4 rounded-lg">
                  <div className="w-10 h-10 mx-auto mb-3">
                    <Shield className="w-full h-full text-blue-500" />
                  </div>
                  <p className="text-white text-sm font-bold">Shield</p>
                  <p className="text-zinc-500 text-xs">5 sec immunity</p>
                </div>
                <div className="bg-zinc-900/80 backdrop-blur border border-red-600/30 p-4 rounded-lg">
                  <div className="w-10 h-10 mx-auto mb-3">
                    <Clock className="w-full h-full text-purple-500" />
                  </div>
                  <p className="text-white text-sm font-bold">Slow Motion</p>
                  <p className="text-zinc-500 text-xs">3 sec slowmo</p>
                </div>
                <div className="bg-zinc-900/80 backdrop-blur border border-red-600/30 p-4 rounded-lg">
                  <div className="w-10 h-10 mx-auto mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" fill="#10B981" />
                    </svg>
                  </div>
                  <p className="text-white text-sm font-bold">Extra Life</p>
                  <p className="text-zinc-500 text-xs">+1 life</p>
                </div>
              </motion.div>

              <motion.button
                onClick={startGame}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-16 py-6 text-xl font-bold rounded-none border-b-4 border-red-900 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-600/50"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                START RACE
              </motion.button>

              <p className="text-zinc-600 text-sm mt-6">
                High Score: {highScore.toString().padStart(5, '0')}
              </p>
            </div>
          </motion.div>
        )}

        {/* Tire Tracks */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <defs>
            <pattern id="tire-tracks" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
              <rect x="10" y="2" width="30" height="4" fill="rgba(239,68,68,0.3)" rx="2"/>
              <rect x="10" y="14" width="30" height="4" fill="rgba(239,68,68,0.3)" rx="2"/>
              <rect x="60" y="2" width="30" height="4" fill="rgba(239,68,68,0.3)" rx="2"/>
              <rect x="60" y="14" width="30" height="4" fill="rgba(239,68,68,0.3)" rx="2"/>
            </pattern>
          </defs>
          <motion.rect
            width="100%"
            height="100%"
            fill="url(#tire-tracks)"
            animate={{ x: [0, -100] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Exhaust Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-red-500/40 rounded-full pointer-events-none blur-sm"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 + 50],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
            style={{
              left: `${20 + (i * 4)}%`,
              top: `${30 + (i % 3) * 20}%`
            }}
          />
        ))}

        {/* Horizon Lights */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950/80 to-transparent">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="absolute bottom-10 w-1 h-20 bg-gradient-to-t from-red-500/60 to-transparent"
              style={{ left: `${i * 12.5}%` }}
              animate={{
                height: [60, 80, 60],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </>
    );
  })()}

  {/* Original CTA Content - Only show when game is not active */}
  {!(() => {
    const [gameActive] = useState(false);
    return gameActive;
  })() && (
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none">
      <FadeIn>
        <motion.h2
          className="text-6xl md:text-7xl font-black mb-8 text-white"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
          animate={{
            textShadow: [
              '0 0 20px rgba(239, 68, 68, 0.5)',
              '0 0 30px rgba(239, 68, 68, 0.8)',
              '0 0 20px rgba(239, 68, 68, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          READY TO<br/>IGNITE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">JOURNEY?</span>
        </motion.h2>
        <p className="text-xl text-zinc-300 mb-12 leading-relaxed max-w-2xl mx-auto">
          Join thousands of enthusiasts who've experienced automotive excellence.
          Your premium vehicle awaits.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
          <Link to="/contact" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 px-12 py-8 text-lg font-bold rounded-none border-b-4 border-red-900 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              BOOK CONSULTATION
            </Button>
          </Link>
          <Link to="/vehicles" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto border-2 border-zinc-600 text-white hover:bg-zinc-800 hover:border-red-500 px-12 py-8 text-lg font-bold rounded-none transition-all duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              EXPLORE VEHICLES
            </Button>
          </Link>
        </div>
      </FadeIn>
    </div>
  )}
</section>
