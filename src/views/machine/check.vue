<template>
  <div class="app-container">
    <div class="filter-container">
      <!--      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;">
        reviewer
      </el-checkbox>
    </div>

    <!--  <p style="text-align: center; margin: 0 0 20px">使用 render-content 自定义数据项</p>
    <div style="text-align: center">
      <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :render-content="renderFunc"
        :titles="['Source', 'Target']"
        :button-texts="['到左边', '到右边']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      >
        <el-button slot="left-footer" class="transfer-footer" size="small">操作</el-button>
        <el-button slot="right-footer" class="transfer-footer" size="small">操作</el-button>
      </el-transfer>
    </div> -->
    <!-- <p style="text-align: center; margin: 50px 0 20px">使用 scoped-slot 自定义数据项</p> -->
    <div style="text-align: center;min-width:100%;">
      <el-transfer
        v-model="value4"
        style="text-align: left; display: inline-block;"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :titles="['Source', 'Target']"
        :button-texts="['回退', '审核']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      >
        <span slot-scope="{ option }">{{ option.key }} - {{ option.label }} </span>
        <el-button slot="left-footer" class="transfer-footer" size="small">操作</el-button>
        <el-button slot="right-footer" class="transfer-footer" size="small">操作</el-button>
      </el-transfer>
    </div>

  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'MachineCheckTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  directives: { waves },
  filters: {
  },
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 18; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1],
      value4: [1]
    /*   renderFunc(h, option) {
        return <span>{ option.key } - { option.label }</span>
      } */
    }
  },
  created() {
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>
<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
  .el-transfer-panel{
    min-width: 570px;
    width: auto;
  }
  .el-transfer-panel__body {
    height: 500px;
  }
  .el-transfer-panel__list.is-filterable {
    height: 480px;
    padding-top: 0;
}
</style>
