<template>
  <div class="form-item">
    <label class="label">{{ label }}</label>
    <van-field
      :class="{ focus: isFocus }"
      class="c-input"
      v-model="value"
      autocomplete="off"
      :clearable="clearable"
      :type="type"
      :border="border"
      @focus="handleFocus"
      @blur="handleBlur"
      :placeholder="placeholder"
    >
      <template #right-icon>
        <slot name="right-icon"></slot>
      </template>
      <template #button>
        <slot name="button"></slot>
      </template>
    </van-field>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "请输入",
  },
  border: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
});
const value = defineModel("value", { required: true });
const emit = defineEmits(["focus", "blur"]);
const isFocus = ref(false);
const handleFocus = (e) => {
  isFocus.value = true;
  emit("focus", e);
};
const handleBlur = (e) => {
  isFocus.value = false;
  emit("blur", e);
};
</script>
<style lang="scss" scoped>
.form-item {
  .c-input {
    margin-top: 12px;
    margin-bottom: 20px;
    border: 2px solid transparent;
    &.focus {
      border-color: #ffffff;
    }
  }
  .label {
    font-size: 30px;
    color: #ffffff;
    line-height: 35px;
  }
}
</style>
