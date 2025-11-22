"use client";

import React, { useEffect, useRef, useState } from "react";
import { Trophy, Play, RotateCcw, Car } from "lucide-react";

interface GameState {
  isPlaying: boolean;
  gameOver: boolean;
  score: number;
  highScore: number;
  speed: number;
}

export const HighwayRacer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    gameOver: false,
    score: 0,
    highScore: 0,
    speed: 5,
  });

  // Game constants
  const LANE_COUNT = 3;
  const CAR_WIDTH = 50;
  const CAR_HEIGHT = 90;
  const LANE_WIDTH = 100;
  
  // Mutable game state (refs for performance in game loop)
  const playerX = useRef(1); // Lane 0, 1, 2
  const obstacles = useRef<{ x: number; y: number; speed: number; color: string }[]>([]);
  const roadOffset = useRef(0);
  const scoreRef = useRef(0);
  const speedRef = useRef(5);
  const animationFrameId = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    // Load high score
    const saved = localStorage.getItem("highwayRacerHighScore");
    if (saved) {
      setGameState((prev) => ({ ...prev, highScore: parseInt(saved) }));
    }
  }, []);

  const startGame = () => {
    setGameState((prev) => ({ ...prev, isPlaying: true, gameOver: false, score: 0, speed: 5 }));
    playerX.current = 1;
    obstacles.current = [];
    scoreRef.current = 0;
    speedRef.current = 5;
    lastTimeRef.current = performance.now();
    
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    gameLoop(performance.now());
  };

  const spawnObstacle = () => {
    const lanes = [0, 1, 2];
    // Don't spawn in a lane if it's too crowded (simple logic)
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    
    // Ensure we don't spawn on top of another obstacle
    const tooClose = obstacles.current.some(
      (obs) => obs.x === lane && obs.y < -150
    );

    if (!tooClose) {
      const colors = ["#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];
      obstacles.current.push({
        x: lane,
        y: -200,
        speed: speedRef.current * (0.8 + Math.random() * 0.4), // Vary speed slightly
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  const drawCar = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, isPlayer: boolean) => {
    // Car Body
    ctx.fillStyle = color;
    // Rounded rect for car body
    ctx.beginPath();
    ctx.roundRect(x, y, CAR_WIDTH, CAR_HEIGHT, 10);
    ctx.fill();

    // Roof / Windshield
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.beginPath();
    ctx.roundRect(x + 5, y + 20, CAR_WIDTH - 10, CAR_HEIGHT - 40, 5);
    ctx.fill();

    // Headlights
    ctx.fillStyle = isPlayer ? "#fbbf24" : "#ef4444"; // Yellow for player, Red (taillights) for enemies
    ctx.beginPath();
    if (isPlayer) {
        // Front lights
        ctx.roundRect(x + 5, y + 2, 10, 5, 2);
        ctx.roundRect(x + CAR_WIDTH - 15, y + 2, 10, 5, 2);
    } else {
        // Rear lights (enemies face down)
        ctx.roundRect(x + 5, y + CAR_HEIGHT - 7, 10, 5, 2);
        ctx.roundRect(x + CAR_WIDTH - 15, y + CAR_HEIGHT - 7, 10, 5, 2);
    }
    ctx.fill();
  };

  const gameLoop = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions
    const centerX = canvas.width / 2;
    const roadWidth = LANE_WIDTH * LANE_COUNT;
    const roadLeft = centerX - roadWidth / 2;

    // Draw Road
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(roadLeft, 0, roadWidth, canvas.height);

    // Draw Lane Markers
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 4;
    ctx.setLineDash([30, 30]);
    ctx.lineDashOffset = -roadOffset.current;

    for (let i = 1; i < LANE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(roadLeft + i * LANE_WIDTH, 0);
      ctx.lineTo(roadLeft + i * LANE_WIDTH, canvas.height);
      ctx.stroke();
    }

    // Update Game State
    roadOffset.current = (roadOffset.current + speedRef.current) % 60;
    scoreRef.current += speedRef.current * 0.1;
    
    // Increase difficulty
    if (Math.floor(scoreRef.current) % 500 === 0) {
        speedRef.current += 0.01;
    }

    // Spawn Obstacles
    if (Math.random() < 0.02 + (speedRef.current * 0.001)) {
      spawnObstacle();
    }

    // Update and Draw Obstacles
    obstacles.current.forEach((obs, index) => {
      obs.y += speedRef.current; // They move down relative to road, but actually we move up. 
      // For this simple version, let's say player is static Y, world moves down.
      // So obstacles move down at world speed + their own speed diff? 
      // Let's keep it simple: Obstacles move down at 'speed'.
      
      const obsX = roadLeft + obs.x * LANE_WIDTH + (LANE_WIDTH - CAR_WIDTH) / 2;
      drawCar(ctx, obsX, obs.y, obs.color, false);

      // Collision Detection
      const playerScreenX = roadLeft + playerX.current * LANE_WIDTH + (LANE_WIDTH - CAR_WIDTH) / 2;
      const playerScreenY = canvas.height - CAR_HEIGHT - 50;

      if (
        playerScreenX < obsX + CAR_WIDTH &&
        playerScreenX + CAR_WIDTH > obsX &&
        playerScreenY < obs.y + CAR_HEIGHT &&
        playerScreenY + CAR_HEIGHT > obs.y
      ) {
        handleGameOver();
      }

      // Remove off-screen
      if (obs.y > canvas.height) {
        obstacles.current.splice(index, 1);
      }
    });

    // Draw Player
    const playerScreenX = roadLeft + playerX.current * LANE_WIDTH + (LANE_WIDTH - CAR_WIDTH) / 2;
    const playerScreenY = canvas.height - CAR_HEIGHT - 50;
    drawCar(ctx, playerScreenX, playerScreenY, "#3b82f6", true);

    // Update UI Score
    setGameState(prev => ({ ...prev, score: Math.floor(scoreRef.current) }));

    if (!gameState.gameOver) {
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }
  };

  const handleGameOver = () => {
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    
    const finalScore = Math.floor(scoreRef.current);
    const currentHigh = parseInt(localStorage.getItem("highwayRacerHighScore") || "0");
    
    if (finalScore > currentHigh) {
      localStorage.setItem("highwayRacerHighScore", finalScore.toString());
      setGameState(prev => ({ ...prev, isPlaying: false, gameOver: true, highScore: finalScore }));
    } else {
      setGameState(prev => ({ ...prev, isPlaying: false, gameOver: true }));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!gameState.isPlaying) return;
    
    if (e.key === "ArrowLeft") {
      playerX.current = Math.max(0, playerX.current - 1);
    } else if (e.key === "ArrowRight") {
      playerX.current = Math.min(LANE_COUNT - 1, playerX.current + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState.isPlaying]);

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[3/4] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
      <canvas
        ref={canvasRef}
        width={600}
        height={800}
        className="w-full h-full block bg-slate-900"
      />

      {/* UI Overlay */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Score</div>
          <div className="text-3xl font-bold text-white font-mono">{Math.floor(gameState.score)}</div>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-right">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Best</div>
          <div className="text-3xl font-bold text-yellow-400 font-mono">{gameState.highScore}</div>
        </div>
      </div>

      {/* Start / Game Over Screen */}
      {(!gameState.isPlaying) && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center z-10">
          {gameState.gameOver ? (
            <>
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Car className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">CRASHED!</h2>
              <p className="text-slate-400 mb-8">You hit another vehicle.</p>
              
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 w-full max-w-xs mb-8">
                <div className="text-sm text-slate-400 mb-1">Final Score</div>
                <div className="text-4xl font-bold text-white mb-4">{Math.floor(gameState.score)}</div>
                {Math.floor(gameState.score) >= gameState.highScore && gameState.score > 0 && (
                   <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-bold bg-yellow-400/10 px-3 py-1 rounded-full">
                     <Trophy className="w-4 h-4" /> New High Score!
                   </div>
                )}
              </div>

              <button
                onClick={startGame}
                className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <RotateCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
                Try Again
              </button>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-indigo-600/20 rounded-3xl flex items-center justify-center mb-8 rotate-3">
                <Car className="w-12 h-12 text-indigo-400" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                Highway <span className="text-indigo-500">Racer</span>
              </h1>
              <p className="text-lg text-slate-400 mb-12 max-w-md">
                Dodge traffic, survive as long as possible, and compete for the top spot on the leaderboard.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-sm">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-2xl font-bold text-white mb-1">←</div>
                  <div className="text-xs text-slate-400 uppercase">Left</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-2xl font-bold text-white mb-1">→</div>
                  <div className="text-xs text-slate-400 uppercase">Right</div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="w-full max-w-xs py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-indigo-900/20"
              >
                <Play className="w-5 h-5 fill-current" />
                Start Engine
              </button>
            </>
          )}
        </div>
      )}
      
      {/* Mobile Controls (Visible only on touch devices ideally, but showing for all for now) */}
      {gameState.isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-32 flex md:hidden">
            <div 
                className="flex-1 active:bg-white/5 transition-colors"
                onTouchStart={() => { playerX.current = Math.max(0, playerX.current - 1); }}
            />
            <div 
                className="flex-1 active:bg-white/5 transition-colors"
                onTouchStart={() => { playerX.current = Math.min(LANE_COUNT - 1, playerX.current + 1); }}
            />
        </div>
      )}
    </div>
  );
};
