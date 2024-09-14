<template>
  <div class="form-item">
    <label class="label">{{ label }}</label>
    <div class="form-item__content">
      <van-field
      @update:model-value="handleUpdateModelValue"
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
        :maxlength="maxlength"
      >
        <template #right-icon>
          <slot name="right-icon"></slot>
        </template>
        <template #button>
          <slot name="button"></slot>
        </template>
      </van-field>
      <slot name="unit"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  maxlength: {
    type: Number,
    default: 10000000,
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
const emit = defineEmits(["focus", "blur", "update:value"]);
const isFocus = ref(false);
const handleFocus = (e) => {
  isFocus.value = true;
  emit("focus", e);
};
const handleBlur = (e) => {
  isFocus.value = false;
  emit("blur", e);
};
const handleUpdateModelValue = (value) => {
  emit("update:value", value)
}
</script>
<style lang="scss" scoped>
.form-item {
  width: 100%;
  .label {
    font-size: 30px;
    color: #ffffff;
    line-height: 35px;
  }
  .form-item__content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .c-input {
      margin-top: 12px;
      margin-bottom: 20px;
      border: 2px solid transparent;
      &.focus {
        border-color: #ffffff;
      }
    }
  }
 
}
</style>
