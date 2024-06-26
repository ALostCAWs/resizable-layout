<script setup>
import Sidebar from './components/sidebar/Sidebar.vue';
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
    validateWidth: function (updatedWidth) {
      if (updatedWidth < this.minSidebarSize) {
        return this.minSidebarSize;
      }
      if (updatedWidth > this.maxSidebarSize) {
        return this.maxSidebarSize;
      }
      return updatedWidth;
    },
    beginSidebarDrag: function (e) {
      this.dragging = true;
      this.resizeContainer.removeEventListener('mousemove', this.leftSideBarResize);
      this.resizeContainer.removeEventListener('mousemove', this.rightSideBarResize);

      if (e.toElement.classList.contains('left')) {
        this.resizeContainer.addEventListener('mousemove', this.leftSideBarResize);
      }
      if (e.toElement.classList.contains('right')) {
        this.resizeContainer.addEventListener('mousemove', this.rightSideBarResize);
      }
    },
    endSidebarDrag: function (e) {
      this.dragging = false;
    },
    leftSideBarResize: function (e) {
      if (!this.dragging) {
        return;
      }

      const updatedWidth = this.validateWidth(e.x);
      this.mainContentWidth = (this.mainContentWidth - (updatedWidth - this.leftSidebarWidth));
      this.leftSidebarWidth = updatedWidth;
      localStorage.setItem("leftSidebarWidth", this.leftSidebarWidth);
    },
    rightSideBarResize: function (e) {
      if (!this.dragging) {
        return;
      }

      const updatedWidth = this.validateWidth(window.innerWidth - e.x);
      this.mainContentWidth = (this.mainContentWidth - (updatedWidth - this.rightSidebarWidth));
      this.rightSidebarWidth = updatedWidth;
      localStorage.setItem("rightSidebarWidth", this.rightSidebarWidth);
    }
  },
  data() {
    return {
      dragging: false,
      minSidebarSize: null,
      maxSidebarSize: null,
      resizeContainer: null,
      mainContent: null,
      leftSidebar: null,
      rightSidebar: null,
      leftController: null,
      rightController: null,
      mainContentWidth: null,
      leftSidebarWidth: parseInt(localStorage.getItem("leftSidebarWidth")),
      rightSidebarWidth: parseInt(localStorage.getItem("rightSidebarWidth")),
      controllerWidth: 8
    };
  },
  watch: {
    mainContentWidth: function (updatedWidth) {
      this.mainContent.style.width = `${updatedWidth}px`;
    },
    leftSidebarWidth: function (updatedWidth) {
      this.mainContent.style.left = `${updatedWidth + this.controllerWidth}px`;
      this.leftSidebar.style.width = `${updatedWidth}px`;
      this.leftController.style.left = `${updatedWidth}px`;
    },
    rightSidebarWidth: function (updatedWidth) {
      this.rightSidebar.style.width = `${updatedWidth}px`;
      this.rightController.style.left = `${this.leftSidebarWidth + this.mainContentWidth}px`;
    }
  },
  created() {
    this.minSidebarSize = Math.floor(window.innerWidth / 8);
    this.maxSidebarSize = Math.floor(window.innerWidth / 2.5);
  },
  mounted() {
    this.resizeContainer = document.querySelector('.resizable-components-container');
    this.mainContent = document.querySelector('.main-content');
    this.leftSidebar = document.querySelector('.resizable-sidebar-left');
    this.rightSidebar = document.querySelector('.resizable-sidebar-right');
    this.leftController = document.querySelector('.resize-controller-left');
    this.rightController = document.querySelector('.resize-controller-right');

    if (this.leftSidebarWidth === null || this.leftSidebarWidth === undefined) {
      this.leftSidebarWidth = Math.floor(this.leftSidebar.getBoundingClientRect().width);
    }
    if (this.rightSidebarWidth === null || this.rightSidebarWidth === undefined) {
      this.rightSidebarWidth = Math.floor(this.rightSidebar.getBoundingClientRect().width);
    }

    this.mainContentWidth = window.innerWidth - this.leftSidebarWidth - this.rightSidebarWidth - (this.controllerWidth * 2);

    this.mainContent.style.width = `${this.mainContentWidth}px`;
    this.mainContent.style.left = `${this.leftSidebarWidth + this.controllerWidth}px`;
    this.leftSidebar.style.width = `${this.leftSidebarWidth}px`;
    this.rightSidebar.style.width = `${this.rightSidebarWidth}px`;
    this.leftController.style.left = `${this.leftSidebarWidth}px`;
    this.rightController.style.left = `${this.leftSidebarWidth + this.mainContentWidth}px`;

    this.leftController.addEventListener('mousedown', this.beginSidebarDrag);
    this.rightController.addEventListener('mousedown', this.beginSidebarDrag);
    this.resizeContainer.addEventListener('mouseleave', this.endSidebarDrag);
    this.resizeContainer.addEventListener('mouseup', this.endSidebarDrag);
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
  /* background-color: var(--accent-color-faded); */

  cursor: col-resize;
}

.resizable-sidebar-right {
  right: 0;
}
</style>
