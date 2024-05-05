<template>
  <div class="mt-6">
    <h1>Баланс: {{ isLoading ? 'Загрузка...' : `${balance} ₽` }}</h1>

    <v-btn
      :disabled="isLoading"
      color="orange"
      class="mt-4"
      @click="isDialogOpen = true"
    >
      Вывести средства
    </v-btn>
    
    <v-dialog
      v-model="isDialogOpen"
      width="auto"
    >
      <v-card
        width="500"
        class="pa-4"
      >
        <v-card-title>Вывод средств</v-card-title>

        <v-card-text>
          <v-form
            v-model="isValidForm"
          >
            <v-text-field
              class="mt-4"
              v-model="moneyRequest.cardNumber"
              label="Номер карты"
              placeholder="Введите номер карты"
              variant="outlined"
              :rules="cardNumberRules"
            ></v-text-field>

            <v-text-field
              class="mt-4 mb-4"
              type="number"
              v-model="moneyRequest.sum"
              label="Сумма"
              placeholder="Введите сумму"
              variant="outlined"
              :rules="sumRules"
            ></v-text-field>

            <p style="font-size: 14px; color: lightgray">Доступные средства: {{ this.balance }} ₽</p>

            <p>Комиссия: 3%</p>

            <v-btn
              :disabled="!isValidForm || isSendingRequestLoading"
              class="mt-4"
              block
              color="orange"
              variant="outlined"
              @click="sendRequest()"
            >
              Отправить заявку
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <Teleport to="body">
      <v-alert
        class="alert"
        v-model="isRequetSend"
        color="success"
        icon="$success"
        text="Заявка отправлена!"
        width="300"
        closable
        border="start"
      ></v-alert>
    </Teleport>
  </div>
</template>
<script>
import { getBalance } from '../../http/userAPI';
import { createMoneyRequest } from '../../http/userAPI';

export default {
  data() {
    return {
      balance: null,
      isLoading: false,
      isDialogOpen: false,
      isValidForm: false,
      isRequetSend: false,
      isSendingRequestLoading: false,
      moneyRequest: {
        cardNumber: '',
        sum: null,
      },
      cardNumberRules: [
        value => {
          if (value) return true;

          return 'Введите номер карты';
        },
        value => {
          let reg = /^\d+$/;

          if (reg.test(value)) return true;

          return 'Номер карты должен содержать только цифры!'
        },
        value => {
          if (value.length === 16) return true;

          return 'Номер карты должен состоять из 16 цифр!'
        },
      ],
      sumRules: [
        value => {
          if (value) return true;

          return 'Введите сумму!';
        },
        value => {
          if (value >= 150) return true; 

          return 'Минимальная сумма - 150 рублей'
        },
        value => {
          if (value <= this.balance) return true;

          return 'Недостаточно средств!'
        }
      ],
    }
  },
  watch: {
    isDialogOpen(newValue) {
      this.moneyRequest.cardNumber = '';
      this.moneyRequest.sum = null;
    }
  },
  async created() {
    try {
      this.isLoading = true;
      this.balance = (await getBalance()).balance;
    } catch (e) {
      alert(e);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async sendRequest() {
      try {
        this.isSendingRequestLoading = true;
        await createMoneyRequest(this.moneyRequest);
        this.balance = this.balance - this.moneyRequest.sum;
        this.isDialogOpen = false;
        this.isRequetSend = true;
      } catch (e) {
        alert(e);
      } finally {
        this.isSendingRequestLoading = false;
      }
    }
  }  
}
</script>
<style>
.alert {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>