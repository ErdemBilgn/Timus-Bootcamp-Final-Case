<template >
  <v-container>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="factories" :sort-by="[{ key: 'calories', order: 'asc' }]">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>FABRİKALARIM</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ props }">
                  <v-btn color="red-darken-4" variant="outlined" dark v-bind="props">
                    Yeni Fabrika
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.firm_name" label="Firma Adı"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.membership_date" label="Üyelik Tarihi"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.membership_end_date"
                            label="Üyelik Bitiş Tarihi"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.employee_count" type="number"
                            label="Çalışan Sayısı"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-checkbox v-model="editedItem.free_member" label="Ücretsiz Üye"></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon size="small" class="me-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
            <v-btn variant="outlined" class="ml-2" size="small">
              Detay
            </v-btn>
          </template>
        </v-data-table>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapStores } from 'pinia'
import { useFactoriesStore } from '../stores'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'Firma Adı',
        align: 'start',
        key: 'firm_name',
      },
      { title: 'Üyelik Tarihi', key: 'membership_date' },
      { title: 'Üyelik Bitiş Tarihi', key: 'membership_end_date' },
      { title: 'Çalışan Sayısı', key: 'employee_count' },
      { title: 'Ücretsiz Üye', key: 'free_member' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    factories: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      firm_name: '',
      membership_date: '',
      membership_end_date: '',
      emplyee_count: 0,
      free_member: null,
    },
    errorMessage: ""
  }),

  computed: {
    ...mapStores(useFactoriesStore),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const result = await this.factoriesStore.getAllFactories();
        this.factories = result
        this.factories = this.factories.map(obj => {
          return {
            ...obj,
            membership_date: this.formatDate(obj.membership_date),
            membership_end_date: this.formatDate(obj.membership_end_date)
          }
        })
      } catch (err) {
        console.log(err)
        this.errorMessage = await err.response.data.message
      }

    },

    formatDate(inputDate) {
      const dateObj = new Date(inputDate);
      const year = dateObj.getUTCFullYear();
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getUTCDate() + 1).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },

    editItem(item) {
      this.editedIndex = this.factories.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.factories.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.closeDelete()
      try {
        const id = this.factories[this.editedIndex].id;
        this.factoriesStore.deleteFactory(id);
        this.initialize()
      } catch (err) {
        console.log(err)
        this.errorMessage = err.response
      }
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        try {
          this.editedItem.employee_count = parseInt(this.editedItem.employee_count)
          await this.factoriesStore.updateFactory(this.editedItem.id, this.editedItem)
          this.initialize();
        } catch (err) {
          console.log(err)
          this.errorMessage = await err.response.data.message;
        }
      } else {

        try {
          this.editedItem.employee_count = parseInt(this.editedItem.employee_count);
          await this.factoriesStore.insertFactory(this.editedItem);
          this.initialize()
        } catch (err) {
          this.errorMessage = await err.response.data.message
        }
      }
      this.close()
    },
  },
}
</script>
<style ></style>