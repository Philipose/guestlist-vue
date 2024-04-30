<script setup>

import { ref, computed } from 'vue';
import weddingData from './assets/wedding.json'

const weddingList = ref(weddingData)
const search = ref('')

const headers = [
  { text: 'Name', value: 'Name' },
  { text: 'Table', value: 'Table' },
  { text: '', value: 'actions', sortable: false },
]

const searchList = computed(() => {
  if(search.value.length < 1) {
    return weddingList.value
  }
  return weddingList.value.filter(person => (person['Name']).toLowerCase().includes(search.value.toLowerCase()))
})


function getPartyMembers(party, person) {
  return weddingData.filter(partyMember => {
    return party == partyMember['Party'] && (person['Name'] !== partyMember['Name'])
  })
}

function getTableMembers(table, person) {
  return weddingData.filter(tableMember => {
    return table == tableMember['Table'] && (person['Name'] !== tableMember['Name'] && person["Party"] !== tableMember["Party"])
  })
}

function getFormattedPartyandTableMembers(person) {
  const party = getPartyMembers(person['Party'], person)
  const table = getTableMembers(person['Table'], person)
  let fullInfo = "Table: " + person['Table'] + "\nFood: " + person['Food'] + "\n\n"
  if (party.length > 0){
    fullInfo = fullInfo + "Party Members:\n"
    for (let i = 0; i < party.length; i++) {
      fullInfo= fullInfo + party[i]['Name']+ " - Table: " + party[i]['Table'] + "\n"
    }
    fullInfo = fullInfo + "\n"
  }
  if (table.length > 0){
    fullInfo = fullInfo + "Other People in Table " + person['Table'] + ":\n"
    for (let i = 0; i < table.length; i++) {
      fullInfo= fullInfo + table[i]['Name'] + "\n"
    }
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
      <input v-model="search" class="w-full rounded-lg flex mb-4" placeholder="Type Your Name Here">
    </div>

    <EasyDataTable
    :fixed-header="false"
    :alternating="true"
    :headers="headers"
    :items="searchList"
    :table-class-name="'customize-table w-full rounded-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'"
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
.customize-table {
  --easy-table-border: 1px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #8C9473;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #8C9473;

  --easy-table-body-row-font-color: #fff;
  --easy-table-body-row-background-color: #71785c;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #fff;
  --easy-table-body-row-hover-background-color: #2d3a4f;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #2d3a4f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
