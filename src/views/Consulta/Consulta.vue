<template>
  <div class="container">
    <div class="wrap">
      <transition name="form">
        <div class="img" v-if="!cliente"></div>
      </transition>

      <transition name="form">
        <div class="form" v-if="!cliente" ref="form">
          <h1>Consulta Online</h1>
          <form v-on:submit.prevent="search()">
            <input v-model="q" ref="q" type="number" placeholder="Número de Identificacion" required />
            <button>{{ searching ? 'Buscando...' : 'Buscar' }}</button>
          </form>
        </div>
      </transition>

      <transition name="resultados">
        <div class="results" v-if="cliente">
          <div class="row uid">ID: {{ cliente.uid }}</div>
          <div class="row name">Cliente: {{ cliente.name }}</div>
          <div class="row service_type">Tipo de Servicio: {{ cliente.service_type }}</div>
          <div class="row aplication_date">Fecha de Aplicación: {{ cliente.aplication_date.toDate().toLocaleDateString() }}</div>
          <div class="row expiration_date">Feha de Expiracion: {{ cliente.expiration_date.toDate().toLocaleDateString() }}</div>

          <div>
            <button @click="cliente = undefined">Volver</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { db, Timestamp } from '../../db';

export default {
  name: 'Consulta',

  data: () => ({
    searching: false,
    cliente: undefined,
    q: '',
  }),

  methods: {
    search() {
      this.searching = true;

      db.collection('clientes')
        .where('uid', '==', parseInt(this.q))
        .get()
        .then((querySnapshot) => {
          this.cliente = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            aplication_date: doc.aplication_date,
            ...doc.data(),
          }))[0];

          if (this.cliente === undefined) {
            alert(`No existe el cliente con id '${this.q}'`);
          }
        })
        .finally(() => (this.searching = false));
    },
  },

  mounted() {
    try {
      this.$refs.form.addEventListener('animationend', () => {
        this.q = 101;
        //this.$refs.q.focus();
      });
    } catch (error) {}
  },
};
</script>

<style lang="scss" scoped src="./styles.scss"></style>
