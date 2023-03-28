<template>
  <div>
    <b-modal modal-class="modal-newclient" body-class="p-0" id="modal-editclient" no-stacking>
      <template #modal-header>
        <h2 class="header-title">
          Изменить данные <span class="title-id">ID: {{ id }}</span>
        </h2>
        <button class="btn-cls" @click="hideModal">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 
                          15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z" fill="#B0B0B0" />
          </svg>
        </button>
      </template>
      <template #default>
        <form class="form-editclient">
          <fieldset class="editclient-fieldset">
            <legend class="form-client-legend">Фамилия*</legend>
            <div class="form-group">
              <input class="form-name" type="text" required v-model="client.surname">
            </div>
          </fieldset>
          <fieldset class="editclient-fieldset">
            <legend class="form-client-legend">Имя*</legend>
            <div class="form-group">
              <input class="form-name" type="text" required v-model="client.name">
            </div>
          </fieldset>
          <fieldset class="editclient-fieldset">
            <legend class="form-client-legend">Отчество</legend>
            <div class="form-group">
              <input class="form-name" type="text" required v-model="client.lastName">
            </div>
          </fieldset>
        </form>
        <ContactField v-model="client.contacts" :contacts="client.contacts" @add-contact="addContact" @delete-contact="deleteContact" />
      </template>
      <template #modal-footer>
        <button class="btn-savecontact" @click.prevent="updateClientInfo"> Сохранить </button>
        <button class="btn-delelecontact" @click.prevent="showDeleteModal"> Удалить клиента </button>
      </template>
    </b-modal>

  </div>
</template>

<script>
//import ModalDeleteClient from '@/components/ModalDeleteClient.vue';
import ContactField from '@/components/ContactField.vue'
import API_BASE_URL from '@/config';
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      client: {},
    }
  },
  components: {
    ContactField,
  },
  methods: {
    ...mapMutations([
      'updateClient'
    ]),
    showDeleteModal() {
      this.$bvModal.show('modal-deleteclient');
    },
    hideModal() {
      this.$bvModal.hide('modal-editclient');
    },
    updateClientInfo() {
      axios.patch(API_BASE_URL + 'api/clients/' + this.client.id, this.client,)
        .then((responce) => {
          this.hideModal();
          this.updateClient(responce.data);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getClientsInfo() {
      axios.get(API_BASE_URL + 'api/clients/' + this.id,)
        .then((responce) => {
          this.client = responce.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    addContact(newContacts) {
      this.client.contacts = (newContacts);
    },
    deleteContact(newContacts) {
      this.client.contacts = (newContacts);
    }
  },
  computed: {    
  },
  watch: {
    id() {
      this.getClientsInfo();
    }
  }
}
</script>