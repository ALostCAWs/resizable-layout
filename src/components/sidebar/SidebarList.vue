<script setup>
import { toTitleCase } from '../../functions/convertData'
import { sortSpeciesArray } from '../../functions/sortData';
</script>

<template>
  <div>
    <button :class="{expanded: expandActive}" :aria-expanded="expandActive" :aria-controls="`${group}-${genus}-species`" @click="toggleDetails">
      <h3>{{ toTitleCase(genus) }}</h3>
    </button>
    <div :id="`${group}-${genus}-species`" class="sidebar-list" v-show="expandActive">
      <div v-if="failedGetSpecies">
        <button>
          <p>No Species Found</p>
        </button>
      </div>
      <div v-else>
        <button v-for="(item, index) in species">
          <p>{{ toTitleCase(item.species) }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarList',
  props: {
    group: { required: true },
    genus: { required: true }
  },
  methods: {
    async toggleDetails() {
      if (!this.speciesLoaded) {
        await this.getAllPlantSpeciesInGenus();
        this.speciesLoaded = this.species.length;
      }
      this.expandActive = !this.expandActive;
    },
    async getAllPlantSpeciesInGenus() {
      try {
        const response = await fetch(`http://localhost:3000/${this.group}/${this.genus}/species`);
        this.species = await response.json();
        this.species.sort(sortSpeciesArray);
      } catch (e) {
        console.error(`failed to get species in genus ${this.genus}`);
        this.failedGetSpecies = true;
      }
    },
  },
  data() {
    return {
      expandActive: false,
      speciesLoaded: false,
      species: [],
      failedGetSpecies: false
    };
  }
}
</script>

<style scoped>
h3 {
  font-size: var(--h6);
}

button > p {
  padding-left: 1em;
  line-height: 1.25em;
}

button {
  width: 100%;
  padding: 0.50em 0;
  padding-left: 0.75em;
  text-align: left;
}

button:hover > h3,
button:hover > p {
  color: var(--accent-color-faded);
}

aside > section > div > div {
  border-top: thin solid var(--accent-color);
}

aside > section > div > div:last-of-type {
  border-bottom: thin solid var(--accent-color);
}

aside .sidebar-list {
  overflow: auto;
  max-height: max-content;
  height: fit-content;
}
</style>