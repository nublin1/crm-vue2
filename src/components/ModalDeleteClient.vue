<template>
  <b-modal modal-class="modal-newclient" body-class="p-0" id="modal-deleteclient">
    <template #modal-header>
      <h2 class="header-title">
        Удалить клиента
      </h2>
      <button class="btn-cls" @click="hideModal">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 
                15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z"
            fill="#B0B0B0" />
        </svg>
      </button>
    </template>
    <template #default>
      <p>
        Вы действительно хотите удалить данного клиента?
      </p>
    </template>
    <template #modal-footer>
      <button class="btn-savecontact" @click="deleteClientByid"> Удалить клиента </button>
      <button class="btn-delelecontact" @click="hideModal"> Отмена </button>
    </template>
  </b-modal>
</template>
<script>

import { mapActions, } from 'vuex';

export default {
  props: ['id'],  
  methods: {
    ...mapActions([
      'deleteClient'
    ]),
    hideModal() {
      this.$bvModal.hide('modal-deleteclient');
    },
    deleteClientByid() {      
      this.deleteClient({ id: this.id });
      this.hideModal();
    },
  },
  
}
</script>