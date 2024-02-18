<!--安全日志查看_列表查看-->
<script setup>

import {ref} from "vue";
import { useRouter } from "vue-router"
import axios from "axios";  // 引入userRouter

const Info =ref([])
axios.get(' http://127.0.0.1:4523/m1/3942191-0-default/branch/getSafeDailyList?page=1&size=5').then(res => {
  Info.value= res.data.data
  console.log(res.data);
  console.log('!!!')
  console.log(Info.value);

})

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
    you: 'No. ',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. ',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. ',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. ',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },

]


const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')

//const name ref('xxx')
//const time ref('xx-xx-xx')
const router = useRouter()
function handleClick() {
  router.push({
    path:'/main/visualSL'
  })
}





</script>

<template>
  <div class="bodyPagelSL">


    <div style="font-size: 18px; font-weight: 700; text-align: left;padding-top: 20px;padding-left: 30px; margin-bottom: 10px">列表查看</div>
    <div style="height: 40px; width: 50%; margin-bottom: 10px">
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
      <div style="float: left; margin-left: 50px; padding-top: 4px;">
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
        <el-table-column prop="name" label="加油站编号" width="250" />
        <el-table-column prop="date" label="时间" width="120" />
        <el-table-column label="巡检项目">
          <el-table-column prop="qian" label="前庭" width="120" />
          <el-table-column prop="bian" label="便利店" width="120" />
          <el-table-column prop="you" label="油罐区" width="120" />
          <el-table-column prop="dian" label="电器设备" width="120" />
          <el-table-column prop="huan" label="环保" width="120" />

          <el-table-column prop="links" label="" width="120px">
            <template #header>
              <!--              <el-input v-model="search" size="small" placeholder="Type to search" />-->
            </template>
            <template #default="scope">

              <!--              ！！链接-->
              <el-link  @click="handleClick(scope.$index, scope.row)">查看详情</el-link>
            </template>


          </el-table-column>


        </el-table-column>


      </el-table>
      <!--    分页 -->
      <el-row>
        <el-col style="">
          <!--        <el-pagination-->
          <!--            :page-size="5"-->
          <!--            :pager-count="11"-->
          <!--            layout="prev, pager, next"-->
          <!--            :total="1000"-->
          <!--        />-->
          <el-pagination background layout="prev, pager, next" :total="1000" />
        </el-col>
      </el-row>


    </div>


  </div>
</template>

<style scoped>
.bodyPagelSL {
  background-color: #f4f3f3;
  height: 100vh;
}
.mainBody {
  width: 90%;
  background-color: #ffffff;
  justify-content: center;
  margin: auto;
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

.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}

.el-pagination {
  justify-content: right;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 40px;
}
.el-table--border th.gutter:last-of-type {
  display: block!important;
}


</style>
