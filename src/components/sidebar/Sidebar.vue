<script setup>
import SidebarList from './SidebarList.vue'
import { toTitleCase } from '../../functions/convertData'
import { sortGeneraArray } from '../../functions/sortData'
</script>

<template>
  <section>
    <h2>{{ capitalizedGroup }}</h2>
    <div v-if="failedGetGenera">
      <button>
        <p>No genera found</p>
      </button>
    </div>
    <div v-else>
      <SidebarList v-for="(item, index) in genera"
        :group="group"
        :genus="item.genus"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Sidebar',
  comments: {
    SidebarList
  },
  props: {
    group: { required: true }
  },
  methods: {
    async getGenera() {
      try {
        const response = await fetch(`http://localhost:3000/${this.group}/genera`);
        this.genera = await response.json();
        await this.genera.sort(sortGeneraArray);
      } catch (e) {
        console.error(`failed to get ${this.group} genera: ${e}`);
        this.failedGetGenera = true;
      }
    }
  },
  data() {
    return {
      capitalizedGroup: this.group,
      genera: [],
      failedGetGenera: false
    };
  },
  async created() {
    this.capitalizedGroup = toTitleCase(this.capitalizedGroup);
    await this.getGenera();
  }
}
</script>

<style scoped>
h2:first-child {
  padding: 1.1em 1em 0.50em;
}
</style>