<!-- PersonItem.vue -->

<script setup>
const props = defineProps({
  person: Object,
  party: Object,
  table: Object
})

import { ref, onMounted } from 'vue';

const partyHTML = ref([]);
const tableHTML = ref([]);

const worker = new Worker(new URL('./worker.js', import.meta.url));


onMounted(() => {
  // Listen for messages from the Web Worker
  worker.onmessage = function(event) {
    partyHTML.value = event.data.partyHTML;
    tableHTML.value = event.data.tableHTML;
    console.log("onmessage", partyHTML, tableHTML);
  };

  // Start the Web Worker with party and table data
  worker.postMessage({ party: props.party, table: props.table });
  console.log("In PersonItem\n", partyHTML, tableHTML);
});
</script>

<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 py=9">
    <td class="text-left">{{ person['First Name'] }} {{ person['Last Name'] }}</td>
    <td class="text-center">{{ person['Table'] }}</td>
    <td class="text-center">
      <button @click="handleClick" class="text-blue-500 hover:text-blue-700">View</button>
    </td>
  </tr>
  <div v-dompurify-html="partyHTML"></div>
  <div v-dompurify-html="tableHTML"></div>
</template>