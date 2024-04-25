<script setup>
import Sidebar from './components/sidebar/Sidebar.vue'
</script>

<template>
  <div>
    <div class="page-wrapper">
      <h1 class="hiddenHeading">Resizable Layout</h1>
      <div class="resizable-components-container">
        <aside class="resizable-sidebar-left resizable">
          <Sidebar
            :group="'plants'"
          />
        </aside>
        <div class="resize-controller resize-controller-left left"></div>
        <section class="main-content resizable"></section>
        <div class="resize-controller resize-controller-right right"></div>
        <aside class="resizable-sidebar-right resizable">
          <Sidebar
            :group="'livestock'"
          />
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Sidebar
  },
  methods: {
    mouseDownFunction: function (e) {
      console.log(e);
      this.dragging = true;
      if (e.toElement.classList.contains('left')) {
        console.log('left');
        this.leftMoveX = e.x;
      }
      if (e.toElement.classList.contains('right')) {
        console.log('right');
        this.rightMoveX = e.x;
        this.rightResizeOffset = Math.round(e.x - (this.leftSidebarWidth + this.controllerWidth + this.mainContentWidth ));
        console.log(this.rightMoveX);
        console.log(this.rightResizeOffset);
      }
    },
    mouseUpFunction: function (e) {
      this.dragging = false;
    },
    mouseMoveFunction: function (e) {
      if (!this.dragging) {
        return;
      }
      console.log('mousemove');

      const updatedWidth = window.innerWidth - e.x;
      this.mainContentWidth = (this.mainContentWidth - (updatedWidth - this.rightSidebarWidth));
      this.rightSidebarWidth = updatedWidth;

      console.log(e.x);
      console.log(this.leftSidebarWidth);
      console.log(this.mainContentWidth);
      console.log(this.rightSidebarWidth);

      this.mainContent.style.width = `${this.mainContentWidth}px`;
      this.rightSidebar.style.width = `${this.rightSidebarWidth}px`;
      this.rightController.style.left = `${this.leftSidebarWidth + this.mainContentWidth}px`
    },
    mouseLeaveFunction: function (e) {
      this.dragging = false;
    }
  },
  data() {
    return {
      dragging: false,
      leftMoveX: null,
      rightMoveX: null,
      leftResizeOffset: null,
      rightResizeOffset: null,
      resizeContainer: null,
      mainContent: null,
      leftSidebar: null,
      rightSidebar: null,
      leftController: null,
      rightController: null,
      mainContentWidth: null,
      leftSidebarWidth: null,
      rightSidebarWidth: null,
      controllerWidth: 10
    };
  },
  async mounted() {
    this.resizeContainer = document.querySelector('.resizable-components-container');
    this.mainContent = document.querySelector('.main-content');
    this.leftSidebar = document.querySelector('.resizable-sidebar-left');
    this.rightSidebar = document.querySelector('.resizable-sidebar-right');
    this.leftController = document.querySelector('.resize-controller-left');
    this.rightController = document.querySelector('.resize-controller-right');

    this.leftSidebarWidth = Math.floor(this.leftSidebar.getBoundingClientRect().width);
    this.rightSidebarWidth = Math.floor(this.rightSidebar.getBoundingClientRect().width);
    this.mainContentWidth = window.innerWidth - this.leftSidebarWidth - this.rightSidebarWidth - (this.controllerWidth * 2);

    this.mainContent.style.width = `${this.mainContentWidth}px`;
    this.mainContent.style.left = `${this.leftSidebarWidth}px`
    this.leftSidebar.style.width = `${this.leftSidebarWidth}px`;
    this.rightSidebar.style.width = `${this.rightSidebarWidth}px`;
    this.leftController.style.left = `${this.leftSidebarWidth}px`;
    this.rightController.style.left = `${this.leftSidebarWidth + this.mainContentWidth}px`;

    this.leftMoveX = this.leftSidebarWidth + this.controllerWidth / 2;
    this.rightMoveX = (this.rightSidebarWidth + this.mainContentWidth) + this.controllerWidth / 2;

    this.rightController.addEventListener('mousedown', this.mouseDownFunction);
    this.resizeContainer.addEventListener('mouseleave', this.mouseLeaveFunction);
    this.resizeContainer.addEventListener('mousemove', this.mouseMoveFunction);
    this.resizeContainer.addEventListener('mousemove', this.mouseMoveFunction);
  }
}
</script>

<style>
@import url('./styles/styles.css');
h1.hiddenHeading {
  position: absolute;
  padding: 0;
  width: 1px;
  height: 1px;
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
  clip-path: inset(0px 0px 99.9% 99.9%);
}

h2:not(aside h2) {
  padding-bottom: 1em;
}

input,
select {
  padding-left: .25em;

  border-bottom: 1px solid var(--accent-color);
  border-radius: 3px;
}

button {
  background-color: var(--accent-color-faded);
}

button:not(aside button) {
  width: 5em;
  height: 1.5em;
  border: thin solid var(--accent-color);
  border-radius: 5px;

  color: var(--accent-color);
}

button:hover {
  background-color: var(--accent-color);
}

button:not(aside button):hover {
  border: thin solid var(--light-color);
}

button:hover {
  color: var(--accent-color-faded);
}

aside {
  overflow: auto;
  position: fixed;
  width: 20%;
  height: 100vh;
  bottom: 0;
  background-color: var(--accent-color-faded);
}

.main-content {
  height: 100vh;
}

.resizable-components-container {
  display: flex;
  flex-direction: row;
}

.resize-controller {
  position: absolute;
  width: 10px;
  height: 100vh;
  background-color: red;

  cursor: col-resize;
}

.resizable-sidebar-right {
  right: 0;
}
</style>
