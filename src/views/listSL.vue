<!--安全日志查看_列表查看-->
<script setup>

import {ref} from "vue";

const valuea = ref('分公司1')
const optiona = [
  {
    value: 'fen1',
    label: '分公司1',
  },
  {
    value: 'fen2',
    label: '分公司2',
  },
  {
    value: 'fen3',
    label: '分公司3',
  },
  {
    value: 'fen4',
    label: '分公司4',
  },
]



const tableData = [
  {
    date: '2099-03-03',
    name: 'xxx',
    qian: '',
    bian: '',
    you: '',
    dian: '',
    huan: '',
    cha:'xxx',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. 189, Grove St, Los Angeles',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. 189, Grove St, Los Angeles',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. 189, Grove St, Los Angeles',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. 189, Grove St, Los Angeles',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. 189, Grove St, Los Angeles',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. 189, Grove St, Los Angeles',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. 189, Grove St, Los Angeles',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
]


const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')




</script>

<template>
  <div class="bodyPagelSL">


  <div style="font-size: 18px; font-weight: 700; text-align: left;padding-top: 20px;padding-left: 30px; ">列表查看</div>
  <div>
    <div style="float: left; margin-left: 30px;">
      <el-select
          v-model="valuea"
          class="m-2"
          placeholder=""
          size="large"
          style="width: 240px"
      >
        <el-option
            v-for="item in optiona"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

    </div>
    <div style="float: left; margin-left: 30px; padding-top: 4px;">
      <div class="demo-date-picker">
        <div >
<!--          <span class="demonstration">Default</span>-->
          <el-date-picker
              v-model="value1"
              type="date"
              placeholder="Pick a day"
              :size="size"
          />
        </div>

    </div>
    </div>
  </div>
  <div class="mainBody">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="加油站编号" width="150" />
      <el-table-column prop="date" label="时间" width="120" />
        <el-table-column label="巡检项目">
          <el-table-column prop="qian" label="前庭" width="120" />
          <el-table-column prop="bian" label="便利店" width="120" />
          <el-table-column prop="you" label="油罐区" />
          <el-table-column prop="dian" label="电器设备" width="120" />
          <el-table-column prop="huan" label="环保" width="120" />

          <el-table-column prop="links" label="Links" width="600px">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <a :href="scope.row.links" target="_blank" class="buttonText">{{scope.row.links}}</a>
            </template>
          </el-table-column>


        </el-table-column>

    </el-table>
  </div>


  </div>
</template>

<style scoped>
.bodyPagelSL {
  background-color: #f4f3f3;
  height: 100vh;
}
.mainBody {
  width: 95%;
  background-color: #ffffff;
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

</style>