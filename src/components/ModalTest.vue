<template>
  <div class="modal-window" :class="{ 'modal-window--open': true }" v-if="open">
    <div class="modal-blackout"></div>
    <div class="modal">
      <div ref="content" class="modal_content">
        <h2 class="modal_content-title">Новый клиент</h2>
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
        <div class="modal-footer">
          <button class="btn-savecontact" @click.prevent="addNewClientInfo"> Сохранить </button>
          <button class="btn-delelecontact" @click="hideModal"> Отмена </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import ContactField from '@/components/ContactField.vue'
import axios from 'axios';
import API_BASE_URL from '@/config';
import { mapMutations } from 'vuex';

export default {
  props: ['open'],
  data() {
    return {
      newClientData: [],
      contacts: [],
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
      setTimeout(() => {
        this.$emit('hideModalNewClient');
      },
        0)
    },

    handleOutsideClick(event) {
      if (event.target !== this.$refs.content && event.target.contains(this.$refs.content)) {
        setTimeout(() => {
          this.$emit('hideModalNewClient');
        }, 400)
      }
    },
    addContact(newContact) {   
      this.contacts = (newContact);
    },

    deleteContact(newContacts) {
      console.log(newContacts);
      this.contacts = (newContacts);
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
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
}
</script>
  
<style>
.modal {
  z-index: 1010;
  overflow: auto;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.modal_content {
  position: relative;
  width: 450px;
  /* height: 400px; */
  margin-top: auto;
  margin-bottom: auto;
  
  background-color: #fff;
}

.modal_content-title {
    margin-bottom: 32px;
    margin-right: 9px;
    padding-top: 25px ;
    padding-left: 30px;
    font-size: 18px;
    line-height: 25px;
    color: #333333
  }

.modal.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-window {
  opacity: 0;
  transition: opacity .4s ease;
}


.modal-window--open {
  opacity: 1;
}

.modal-blackout {
  z-index: 1010;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-color: #000;
}
</style>