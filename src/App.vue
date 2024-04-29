<script setup>

import { ref, computed } from 'vue';
import weddingData from './assets/wedding.json'

const weddingList = ref(weddingData)
const search = ref('')

const headers = [
  { text: 'Name', value: 'First Name' },
  { text: 'Table', value: 'Table' },
  { text: '', value: 'actions', sortable: false },
]

const searchList = computed(() => {
  if(search.value.length < 3) {
    return []
  }
  return weddingList.value.filter(person => (person['First Name']+ ' ' + person['Last Name']).toLowerCase().includes(search.value.toLowerCase()))
})


function getPartyMembers(party, person) {
  return weddingData.filter(partyMember => {
    return party == partyMember['Party'] && (person['First Name']+person['Last Name'] !== partyMember['First Name']+partyMember['Last Name'])
  })
}

function getTableMembers(table, person) {
  return weddingData.filter(tableMember => {
    return table == tableMember['Table'] && (person['First Name']+person['Last Name'] !== tableMember['First Name']+tableMember['Last Name'] && person["Party"] !== tableMember["Party"])
  })
}

function getFormattedPartyandTableMembers(person) {
  console.log(person)
  const party = getPartyMembers(person['Party'], person)
  const table = getTableMembers(person['Table'], person)
  let fullInfo = "Party Members:\n"
  for (let i = 0; i < party.length; i++) {
    fullInfo= fullInfo + party[i]['First Name'] + " " + party[i]['Last Name'] + " - Table: " + party[i]['Table'] + "\n"
  }
  fullInfo = fullInfo + "\nTable Members:\n"
  for (let i = 0; i < table.length; i++) {
    fullInfo= fullInfo + table[i]['First Name'] + " " + table[i]['Last Name'] + " - Table: " + table[i]['Table'] + "\n"
  }
  return fullInfo
}

let searchInput = '';
const handleInput = () => {
  searchInput = search.value;
  handleSearchChange();
}

const loadIntroduction = async (index) => {
  const expandedItem = searchList.value[index];
  // console.log(expandedItem);
  if (!expandedItem.introduction) {
    expandedItem.expandLoading = true;
    try {
      expandedItem.introduction = await getFormattedPartyandTableMembers(expandedItem);
    } catch (error) {
      console.error('Failed to load introduction:', error);
      // Optionally, you can handle errors more gracefully here, e.g., showing an error message to the user
    }    expandedItem.expandLoading = false;
  }
  console.log(expandedItem.introduction)
};
</script>

<template>
    <div class="max-w-4xl mx-auto py-5">
      <input v-model="search" class="w-full rounded-lg justify-items-center flex justify-center mb-4" placeholder="Type Your Name Here">
    </div>

    <EasyDataTable
    :headers="headers"
    :items="searchList"
    :table-class-name="'w-full rounded-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'"
    @expand-row="loadIntroduction"
  >
    <template #expand="item">
      <div
        v-if="item.introduction"
        style="padding: 15px; white-space: pre;"
      >
        {{ item.introduction }}
      </div>
    </template>
  </EasyDataTable>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
