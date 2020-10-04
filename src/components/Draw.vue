<template>
  <div>
    <nav>
      <div class="controls">
        <i class="fas fa-undo" @click="rectangles.pop()"></i>

        <i class="fas fa-mouse-pointer" @click="mode = 'Select'"></i>

        <i class="far fa-square" @click="mode = 'Rectangle'"></i>

        <span class="badge">{{ mode }}</span>
      </div>
    </nav>
    <div @mousedown="down">
      <v-stage
        ref="stage"
        :config="stageSize"
        @mousedown="handleStageMouseDown"
        @touchstart="handleStageMouseDown"
      >
        <v-layer ref="layer">
          <v-rect
            :config="config"
            v-for="(config, i) in rectangles"
            :key="i"
            @transformend="handleTransformEnd"
          />
          <v-transformer ref="transformer" />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
import Konva from "konva";
// let vm = {};
export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height,
      },
      config: {
        x: 20,
        y: 50,
        width: 40,
        height: 100,

        stroke: "black",
      },
      startDraw: false,
      x: 20,
      y: 50,
      width: 40,
      height: 100,
      rectangles: [],
      mode: "Rectangle",
    };
  },
  methods: {
    down(event) {
      if (this.mode === "Rectangle") {
        this.startDraw = !this.startDraw;

        if (this.startDraw) {
          this.x = event.clientX;
          this.y = event.clientY;
        } else {
          this.width = event.clientX;
          this.height = event.clientY;

          this.rectangles.push({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            stroke: "black",
            draggable: true,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            name: `rect${this.rectangles.length + 1}`,
          });
        }
      }
    },
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const rect = this.rectangles.find(
        (r) => r.name === this.selectedShapeName
      );
      // update the state
      rect.x = e.target.x();
      rect.y = e.target.y();
      rect.rotation = e.target.rotation();
      rect.scaleX = e.target.scaleX();
      rect.scaleY = e.target.scaleY();

      // change fill
      rect.fill = Konva.Util.getRandomColor();
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = "";
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its name
      const name = e.target.name();
      const rect = this.rectangles.find((r) => r.name === name);
      if (rect) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = "";
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeName } = this;

      const selectedNode = stage.findOne("." + selectedShapeName);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }
      transformerNode.getLayer().batchDraw();
    },
  },
};
</script>

<style scoped>
.controls {
  background-color: darkgray;
  padding: 1rem;
  border: 1px solid black;
  text-align: center;
}

i {
  font-size: 2rem;
  background-color: white;
  padding: 1rem;
  margin-left: 1rem;
  cursor: pointer;
}

.badge {
  background-color: purple;
  margin-left: 1rem;
  font-size: 2rem;
  color: white;
  font-weight: bold;
  padding: 0.5rem;
}
</style>