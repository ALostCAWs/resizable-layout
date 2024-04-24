<script setup>
import Sidebar from './components/sidebar/Sidebar.vue'
</script>

<template>
  <div>
    <div class="page-wrapper" :inert="modalActive">
      <h1 class="hiddenHeading">Aquarium Management - Tank List</h1>
      <aside class="sidebar-left">
        <Sidebar
          :group="'plants'"
        />
      </aside>
      <aside class="sidebar-right">
        <Sidebar
          :group="'livestock'"
        />
      </aside>
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

  },
  data() {
    return {
    };
  },
  async created() {
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

.list-container {
  width: 40%;
  margin: auto;
  margin-top: 2em;
}

.list-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

aside {
  overflow: auto;
  position: fixed;
  width: 20%;
  height: 100vh;
  bottom: 0;
  background-color: var(--accent-color-faded);
}

.sidebar-left {
  top: 0;
}

.sidebar-right {
  right: 0;
}
</style>
