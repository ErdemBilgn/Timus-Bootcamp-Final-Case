<template >
  <v-container>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="factoryDetails">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ firmName }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ props }">
                  <v-btn color="red-darken-4" variant="outlined" dark v-bind="props">
                    Yeni Detay
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
                          <v-text-field v-model="editedItem.unit" label="Kullanılan Birim"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.start_date" label="Başlangıç Tarihi"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.end_date" label="Bitiş Tarihi"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.usage_kw" type="number" label="Kullanım(kw)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.usage_price" type="number"
                            label="Kullanım Bedeli"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-checkbox v-model="editedItem.discounted_price" label="İndirimli Fiyat"></v-checkbox>
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
import { useFactoryDetailsStore } from '../stores'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'Kullanılan Birim',
        align: 'start',
        key: 'unit',
      },
      { title: 'Tarih Aralığı', key: 'date_range' },
      { title: 'Kullanım(kw)', key: 'usage_kw' },
      { title: 'Kullanım Bedeli', key: 'usage_price' },
      { title: 'İndirimli Fiyat', key: 'discounted_price' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    factoryDetails: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      firm_id: 0,
      unit: '',
      start_date: '',
      end_date: '',
      usage_kw: 0,
      usage_price: 0,
      discounted_price: false
    },
    defaultItem: {
      id: 0,
      firm_id: 0,
      unit: '',
      start_date: '',
      end_date: '',
      usage_kw: 0,
      usage_price: 0,
      discounted_price: false
    },
    errorMessage: ""
  }),

  computed: {
    ...mapStores(useFactoriesStore),
    ...mapStores(useFactoryDetailsStore),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    firmId() {
      return this.$route.params.id;
    },
    firmName() {
      return this.$route.query.firm_name
    }
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
        const result = await this.factoryDetailsStore.getAllDetailsForFactory(this.firmId)
        this.factoryDetails = result
        this.factoryDetails = this.factoryDetails.map(obj => {
          return {
            ...obj,
            date_range: this.formatDateRange(obj.date_range),

          }
        })
      } catch (err) {
        console.log(err)
        this.errorMessage = await err.response.data.message
      }

    },

    formatDateRange(inputDate) {
      const formattedDate = inputDate.replace('[', '(');
      return formattedDate;
    },

    editItem(item) {
      this.editedIndex = this.factoryDetails.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.start_date = this.extractDatesFromDateRange(item.date_range)[0];
      this.editedItem.end_date = this.extractDatesFromDateRange(item.date_range)[1];
      this.dialog = true
    },

    extractDatesFromDateRange(inputDate) {
      const rawDate = inputDate.slice(1, -1);
      const dateArr = rawDate.split(",");
      return dateArr;
    },

    deleteItem(item) {
      this.editedIndex = this.factoryDetails.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.closeDelete()
      try {
        const id = this.factoryDetails[this.editedIndex].id;
        await this.factoryDetailsStore.deleteSinlgeFactoryDetails(id);
        this.initialize()
      } catch (err) {
        this.errorMessage = err.response;
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
          this.editedItem.firm_id = parseInt(this.firmId);
          this.editedItem.usage_kw = parseInt(this.editedItem.usage_kw);
          this.editedItem.usage_price = parseInt(this.editedItem.usage_price);
          await this.factoryDetailsStore.updateFactoryDetails(this.editedItem.id, this.editedItem)
          this.initialize();
        } catch (err) {
          this.errorMessage = await err.response.data.message;
        }
      } else {

        try {
          this.editedItem.firm_id = parseInt(this.firmId);
          this.editedItem.usage_kw = parseInt(this.editedItem.usage_kw);
          this.editedItem.usage_price = parseInt(this.editedItem.usage_price);
          console.log(this.editedItem)
          await this.factoryDetailsStore.insertDetails(this.editedItem);
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