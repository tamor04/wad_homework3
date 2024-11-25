<template>
  <canvas id="voronoiCanvas" class="voronoi-background"></canvas>
</template>

<script>
import { Delaunay } from "d3-delaunay";

export default {
  name: "VoronoiBackground",
  mounted() {
    const canvas = document.getElementById("voronoiCanvas");
    const context = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const getRandomColor = () => {
      const random = Math.random();
      if (random < 0.5) {
        return `rgba(255, ${220 + Math.random() * 35}, ${Math.random() * 50}, 0.5)`;
      } else if (random < 0.8) {
        return `rgba(${150 + Math.random() * 50}, 255, ${100 + Math.random() * 50}, 0.5)`;
      }
      return `rgba(${139 + Math.random() * 40}, ${69 + Math.random() * 50}, 19, 0.5)`;
    };

    const numPoints = 50;
    const points = Array.from({ length: numPoints }, () => ({
      position: [Math.random() * width, Math.random() * height],
      velocity: [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2],
      color: getRandomColor(),
    }));

    const generateVoronoi = () => {
      const delaunay = Delaunay.from(points.map(p => p.position));
      return delaunay.voronoi([0, 0, width, height]);
    };

    const animateVoronoi = () => {
      context.clearRect(0, 0, width, height);

      points.forEach(point => {
        point.position[0] += point.velocity[0];
        point.position[1] += point.velocity[1];
        if (point.position[0] < 0 || point.position[0] > width) point.velocity[0] *= -1;
        if (point.position[1] < 0 || point.position[1] > height) point.velocity[1] *= -1;
      });

      const voronoi = generateVoronoi();
      voronoi.cellPolygons().forEach((cell, i) => {
        context.beginPath();
        cell.forEach(([x, y], index) => {
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.closePath();
        context.fillStyle = points[i].color;
        context.fill();
      });

      requestAnimationFrame(animateVoronoi);
    };

    animateVoronoi();

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
  },
};
</script>

<style scoped>
.voronoi-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>