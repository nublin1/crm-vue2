<template>
  <b-modal modal-class="modal-newclient" body-class="p-0" id="modal-newclient">
    <template #modal-header>
      <h2>
        Новый клиент
      </h2>
    </template>
    <template #default>
      <form class="form-newclient">
        <div class="form-group">
          <input class="form-name" type="text" name="surname" placeholder="Фамилия*" required
            v-model="newClientData.surname">
        </div>
        <div class="form-group">
          <input class="form-name" type="text" name="name" placeholder="Имя*" required v-model="newClientData.name">
        </div>
        <div class="form-group">
          <input class="form-name" type="text" name="lastname" placeholder="Отчество" v-model="newClientData.lastName">
        </div>
      </form>
      <ContactField v-model="contacts" :contacts="contacts" @add-contact="addContact" @delete-contact="deleteContact" />
    </template>
    <template #modal-footer>
      <button class="btn-savecontact" @click.prevent="addNewClientInfo"> Сохранить </button>
      <button class="btn-delelecontact" @click="hideModal"> Отмена </button>
    </template>
  </b-modal>
</template>

<script>
import ContactField from '@/components/ContactField.vue'
import axios from 'axios';
import API_BASE_URL from '@/config';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      newClientData: [],
      contacts: [

      ],
    }
  },
  components: {
    ContactField,
  },
  methods: {
    ...mapMutations([
      'addNewClient',
    ]),

    hideModal() {
      this.$bvModal.hide('modal-newclient');
    },

    addContact(newContact) {
      this.contacts = (newContact);
    },

    deleteContact(newContacts) {
      this.client.contacts = (newContacts);
    },

    addNewClientInfo() {
      const client = {
        name: this.newClientData.name,
        surname: this.newClientData.surname,
        lastName: this.newClientData.lastName,
        contacts: this.contacts
      };

      axios.post(API_BASE_URL + 'api/clients', client,)
        .then((responce) => {
          this.hideModal();
          this.addNewClient(responce.data);
        })
        .catch((error) => {
          console.log(error);
          this.errors = error.response.data.errors || {};
        })
    },
  },
}
</script>