<template>
  <tbody>
    <template v-if="data.length">
      <template v-for="item in data">
        <tr :key="item.id">
          <td v-if="shouldRenderSelection">
            <multi-select :selection="selection" :row="item" />
          </td>
          <td v-for="col in columns" :class="col.tdClass" :style="col.tdStyle">
            <!-- <td> component (tdComp) -->
            <component
              v-if="col.tdComp"
              :is="forDynCompIs(col.tdComp)"
              :row="item"
              :field="col.field"
              :value="item[col.field]"
              :nested="item.__nested__"
              v-bind="$props">
            </component>
            <template v-else>
              {{ item[col.field] }}
            </template>
          </td>
        </tr>
        <transition name="fade">
          <tr v-if="item.__nested__ && item.__nested__.visible" :key="item.id">
            <td :colspan="colLen" class="-nested-comp-td">
              <!-- nested component -->
              <component
                :is="forDynCompIs(item.__nested__.comp)"
                :row="item"
                :nested="item.__nested__"
                v-bind="$props">
              </component>
            </td>
          </tr>
        </transition>
      </template>
    </template>
    <tr v-else-if="!leftFixed && !rightFixed">
      <td :colspan="colLen" class="text-center text-muted">
        <i class='table-loading-icon'></i>
      </td>
    </tr>
  </tbody>
</template>
<script>
import MultiSelect from './MultiSelect.vue'
import props from '../_mixins/props'
import shouldRenderSelection from '../_mixins/shouldRenderSelection'

export default {
  name: 'TableBody',
  components: { MultiSelect },
  mixins: [props, shouldRenderSelection],
  updated: function(){
        $('.table-loading-icon').replaceWith('（No Data）');
  },
  computed: {
    colLen () {
      return this.columns.length + !!this.selection
    }
  }
}
</script>
<style>
.table-loading-icon {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --webkit-animation: spin 2s infinite linear;
    -moz-animation: spin 2s infinite linear;
    -o-animation: spin 2s infinite linear;
    animation: spin 2s infinite linear;
    text-align: center;
    color: #7396DC!important;
    font-size: 125%!important;
}
.table-loading-icon:before {
    content: "\F110";
}
@-moz-keyframes spin {
  0% {
    -moz-transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(359deg);
  }
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
  }
}
@-o-keyframes spin {
  0% {
    -o-transform: rotate(0deg);
  }
  100% {
    -o-transform: rotate(359deg);
  }
}
@-ms-keyframes spin {
  0% {
    -ms-transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(359deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>