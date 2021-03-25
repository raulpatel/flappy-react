import React, { Component } from 'react';

let maxScore = 0;

export default class App extends Component {

    componentDidMount() {
        const bird = document.querySelector(".bird");
        const gameDisplay = document.querySelector(".game-container");
        const ground = document.querySelector(".ground-moving");
        const score = document.querySelector(".score");
        const gameover = document.querySelector(".game-over");
        const restart = document.querySelector(".restart");

        let birdLeft = 220;
        let birdBottom = 100;
        let gravity = 3;
        let isGameOver = false;
        let gap = 430;
        let currScore = -1;

        function startGame() {
            birdBottom -= gravity;
            bird.style.bottom = birdBottom + "px";
            bird.style.left = birdLeft + "px";
            score.textContent = "Score:\n" + currScore.toString();
        }
        let gameTimerId = setInterval(startGame, 20);

        function control(e) {
            if (e.keyCode === 32) {
                jump();
            }
        }

        function jump() {
            if (birdBottom < 500) birdBottom += 55;
            bird.style.bottom = birdBottom + "px";
            console.log(birdBottom);
        }
        document.addEventListener("keyup", control);

        function generateObstacle() {
            let obstacleLeft = 500;
            let obstacleBottom = Math.random() * 60;
            const obstacle = document.createElement("div");
            const topObstacle = document.createElement("div");
            obstacle.classList.add("obstacle");
            topObstacle.classList.add("topObstacle");
            gameDisplay.appendChild(obstacle);
            gameDisplay.appendChild(topObstacle);
            obstacle.style.left = obstacleLeft + "px";
            topObstacle.style.left = obstacleLeft + "px";
            obstacle.style.bottom = obstacleBottom + "px";
            topObstacle.style.bottom = obstacleBottom + gap + "px";

            function moveObstacle() {
                obstacleLeft -= 2;
                obstacle.style.left = obstacleLeft + "px";
                topObstacle.style.left = obstacleLeft + "px";

                if (obstacleLeft === -60) {
                    clearInterval(timerId);
                    obstacle.remove();
                    topObstacle.remove();
                    //gameDisplay.removeChild(obstacle);
                    //gameDisplay.removeChild(topObstacle);
                }
                if ((obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 153
                    || birdBottom > obstacleBottom + gap - 200)) || birdBottom <= 20) {
                    clearInterval(timerId);
                    clearInterval(gameTimerId);
                    gameOver();
                }
            }
            let timerId = setInterval(moveObstacle, 20);
            if (!isGameOver) {
                setTimeout(generateObstacle, 3000);
                currScore++;
                score.textContent = "Score:\n" + currScore.toString();
            }
        }
        generateObstacle();
        function restartGame(e) {
            gameover.textContent = "";
            restart.textContent = "";
            birdLeft = 220;
            birdBottom = 100;
            isGameOver = false;
            currScore = -1;
            document.addEventListener("keyup", control);
            gameTimerId = setInterval(startGame, 20);
            generateObstacle();
        }
        function restartHelp(e) {
            if (e.keyCode === 32) {
                document.removeEventListener('keyup', restartHelp);
                setTimeout(restartGame, 3000);
            }
        }
        function gameOver() {
            // clearInterval(gameTimerId);
            console.log("game over");
            isGameOver = true;
            if (currScore > maxScore) maxScore = currScore;
            score.textContent = "";
            gameover.textContent = "Game Over! \n\n Final Score: \n            " + currScore
                                    + "\nHigh Score: \n            " + maxScore;
            restart.textContent = "(press space to restart)";
            document.removeEventListener("keyup", control);
            ground.classList.add("ground");
            ground.classList.remove("ground-moving");
            const obstacles = document.querySelectorAll(".obstacle");
            const tops = document.querySelectorAll(".topObstacle");
            for (let i = 0; i < obstacles.length; i++) {
                obstacles[i].parentElement.removeChild(obstacles[i]);
                tops[i].parentElement.removeChild(tops[i]);
            }
            document.addEventListener('keyup', restartHelp);
        }
    }

    render() {
        return (
            <div>
                <div class="border-left"></div>
                <div class="game-container">
                    <div class="border-top"></div>
                    <div class="score">
                        <h2 class="score"></h2>
                    </div>
                    <div class="sky">
                        <h2 class="game-over"></h2>
                        <p class="restart"></p>
                        <div class="bird"></div>
                    </div>
                </div>
                <div class="ground-container">
                    <div class="ground-moving"></div>
                </div>
                <div class="border-right"></div>
            </div>
        );
    }
}
