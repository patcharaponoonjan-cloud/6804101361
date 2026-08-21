<template>
  <q-page class="q-pa-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      style="max-width: 600px"
    >
      <q-input
        v-model="name"
        filled
        label="Your name (ชื่อ-สกุล) *"
        hint="Name and surname"
      />
      <q-input v-model="age" filled type="number" label="Your age (อายุ) *" />
      <q-toggle
        v-model="accept"
        label="I accept the license and terms (我接受许可和条款语言)"
      />
      <div>
        <q-btn label="SUBMIT (提出する)" type="submit" color="primary" />
        <q-btn
          label="RESET (リセット)"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()

const name = ref('')
const age = ref(null)
const accept = ref(false)

function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      type: 'negative',
      message: 'You need to accept the license and terms first'
    })
  } else {
    $q.notify({
      type: 'positive',
      message: 'Submitted successfully'
    })
  }
}

function onReset() {
  name.value = ''
  age.value = null
  accept.value = false
}
</script>
