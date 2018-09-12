<template>
  <div class="home">
    <div class="left">
      <div>
        <el-form :inline="true" label-width="100px">
          <el-button-group>
            <el-button type="plain" @click="typeNum1">个人报表</el-button>
            <el-button type="plain" @click="typeNum2">团队报表</el-button>
          </el-button-group>
          <el-form-item label="年月">
            <el-date-picker v-model="date_time" type="month" placeholder="选择月"@change="settleStat"></el-date-picker>
          </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="charts">
        <div class="top_charts">
          <v-line :lineData="offerStatistc" class="visit_manage"></v-line>
          <v-line :lineData="finishStatistc" class="visit_manage"></v-line>
        </div>
        <!-- <div class="bottom_charts" >
            <v-bar v-for="(item, key) of analysisPerformance" :key="item.id" :bar-data="item" class="visit_manage"></v-bar>
       </div> -->
      </div>
      <!-- 表格 -->
      <div class="main_source" style="margin: 24px 20px 0 0;">
        <el-tabs type="border-card" class="main_table">
          <el-tab-pane>
            <span slot="label">进行中的职位</span>
            <div class="database_shows clearfix">
              <div class="clearfix">
                <el-table :data="positionList" border :stripe="true" :fit="true" v-loading="loading" element-loading-text="正在加载">
                  <el-table-column prop="name" label="职位" align="center" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="order_name" label="企业订单" align="center" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="needs" label="需求" align="center" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="recom" label="人才推荐" align="center"></el-table-column>
                  <el-table-column prop="recom_succ" label="推荐通过" align="center"> </el-table-column>
                  <el-table-column prop="offer" label="Offer" align="center"> </el-table-column>
                  <el-table-column prop="giveUp" label="放弃" align="center"> </el-table-column>
                  <el-table-column prop="arrive" label="到岗" align="center"> </el-table-column>
                  <el-table-column prop="is_closCase" label="可结案" align="center"> </el-table-column>
                  <el-table-column prop="closCase" label="结案" align="center"> </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination layout="total, prev, pager, next, jumper" :current-page.sync="currentPage" :total="Number(total1)" @current-change="homePosition" class="fr"  style="margin-top:30px;">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="main_source" style="margin: 24px 20px 0 0;">
        <el-tabs type="border-card" class="main_table">
          <el-tab-pane class="clearfix">
            <span slot="label">候选人动态</span>
            <el-button icon="el-icon-search" class="fr" style="margin-bottom: 10px;" @click="dialogVisible=true"><i class="el-icon-setting"></i></el-button>
            <table class="c_table-bordered " border="1" cellpadding="0" cellspacing="0" width="100%" v-loading="loading" element-loading-text="正在加载">
              <thead>
              <tr>
                <td colspan="8" >
                  <div style="display: flex;justify-content:space-between;align-items:center">
                    <el-button plain @click="all">所有</el-button><i class="el-icon-arrow-right"></i>
                    <el-button plain @click="join">加入职位</el-button><i class="el-icon-arrow-right"></i>
                    <el-button plain @click="recommand">人才推荐</el-button><i class="el-icon-arrow-right"></i>
                    <el-button plain @click="customer">客户面试</el-button><i class="el-icon-arrow-right"></i>
                    <el-button plain @click="offer">offer</el-button><i class="el-icon-arrow-right"></i>
                    <el-button plain @click="arrival">到岗</el-button><i class="el-icon-arrow-right"></i>
                    <el-button plain @click="canFinish">可结案</el-button><i class="el-icon-arrow-right"></i>
                    <el-button plain @click="finished">结案</el-button><i class="el-icon-arrow-right"></i>
                    <el-button plain @click="giveUp">放弃</el-button></i>
                  </div>
                </td>
              </tr>
              <tr>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('姓名') > -1">姓名</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('手机号') > -1">手机号</td>
                <td>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('地区') > -1">地区-</span>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('性别') > -1">性别-</span>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('年龄') > -1">年龄-</span>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('学历') > -1">学历-</span>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('经验') > -1">经验</span>
                </td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('推荐企业') > -1">推荐企业</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('推荐职位') > -1">推荐职位</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('交付顾问') > -1">交付顾问</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('流程') > -1">流程</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('更新时间') > -1">更新时间</td>
              </tr>
              </thead>
              <tbody v-if="tableData.length>0">
              <tr v-for="(row,index) in tableData">
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('姓名') > -1">{{row.person_info.name}}</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('手机号') > -1">{{row.person_info.mobile}}</td>
                <td>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('地区') > -1">{{row.person_info.location+'-'}}</span>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('性别') > -1">{{row.person_info.gender+'-'}}</span>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('年龄') > -1">{{row.person_info.age+'-'}}</span>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('学历') > -1">{{row.person_info.degree+'-'}}</span>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('经验') > -1">{{row.person_info.work_year}}</span>
                </td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('推荐企业') > -1">{{row.recom_company}}</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('推荐职位') > -1">{{row.recom_job}}</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('交付顾问') > -1">{{row.adviser}}</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('流程') > -1">{{row.status_name}}</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('更新时间') > -1">{{row.update_time}}</td>
              </tr>
              </tbody>
              <tbody v-else>
              <tr>
                <td :colspan="8" class="no_data">暂无数据</td>
              </tr>
              </tbody>
            </table>
            <!-- 分页 -->
            <el-pagination layout="total, prev, pager, next, jumper" :current-page.sync="currentPage" :total="Number(total)" @current-change="homePerson" class="fr"  style="margin-top:30px;">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="right">
      <!-- 闹钟提醒 -->
      <div class="alarm_clock">
        <v-tip :icon="alarmClock.icon" :title="alarmClock.title" :data="alarmClock.data" @getItems="customAlarmClock">
          <template scope="scope" slot="more">
            <span v-if="scope.text.type == 2 && scope.text.level == 2">延迟提醒</span>
            <span v-if="scope.text.type == 2 && scope.text.level == 1">系统闹钟</span>
          </template>
          <router-link to="/business/alarmClock?active=reminderLog" slot="checkMore" v-if="alarmClock.data.length > 0">查看更多</router-link>
        </v-tip>
      </div>
      <!-- 待办事项 -->
      <section class="sec-backlog">
        <v-tip :icon="backlog.icon" :title="backlog.title" :data="backlog.data" :link="backlog.link">
          <template scope="scope" slot="msg">
            <span class="c-green">点击查看</span>
          </template>
        </v-tip>
      </section>
      <!-- 企业释放记录 -->
      <v-tip :icon="releaseRecord.icon" :title="releaseRecord.title" :data="releaseRecord.data" v-if="releaseRecord.show">
        <template scope="scope" slot="msg">
          <span>{{scope.text}}</span>
        </template>
        <router-link to="/customer/sourcePool/commonSource" slot="checkMore" v-if="releaseRecord.data.length > 0">查看更多</router-link>
      </v-tip>
    </div>
    <v-modal :visible.sync="isShowClockDate" :width="400">
      <template slot="title">延迟提醒</template>
      <el-form :model="alarmClock_data" :rules="alarmRules" ref="clockForm">
        <el-form-item label="提醒时间" prop="remind_time" class="remind-time">
          <!-- <el-date-picker v-model="alarmClock_data.remind_time" type="datetime" placeholder="选择日期时间"></el-date-picker> -->
          <el-select v-model="alarmClock_data.remind_time" placeholder="请选择">
            <el-option label="5分钟后" :value="300"></el-option>
            <el-option label="30分钟后" :value="1800"></el-option>
            <el-option label="1小时后" :value="3600"></el-option>
            <el-option label="3小时后" :value="10800"></el-option>
            <el-option label="1天后" :value="86400"></el-option>
            <el-option label="不再提醒" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" class="btn-subAlarm" @click="saveCustomDate">保存</el-button>
        </el-form-item>
      </el-form>
    </v-modal>
    <!-- 候选人动态自定义统计项 -->
    <v-modal :visible.sync="dialogVisible"width="30%" class="send_dialog" :height="200" :width="550">
      <template slot="title">自定义统计项</template>
      <div>
        <el-checkbox-group v-model="checkList"  @change="handleCheckedCitiesChange">
          <el-checkbox label="姓名" style="margin-left: 14px"></el-checkbox>
          <el-checkbox label="手机号"></el-checkbox>
          <el-checkbox label="性别"></el-checkbox>
          <el-checkbox label="年龄"></el-checkbox>
          <el-checkbox label="学历"></el-checkbox>
          <el-checkbox label="经验"></el-checkbox>
          <el-checkbox label="期望薪资"></el-checkbox>
          <el-checkbox label="推荐客户"></el-checkbox>
          <el-checkbox label="推荐职位"></el-checkbox>
          <el-checkbox label="交付顾问"></el-checkbox>
          <el-checkbox label="流程"></el-checkbox>
          <el-checkbox label="更新时间"></el-checkbox>
        </el-checkbox-group>
        <div style="margin-top: 22px;text-align: center">
          <el-button type="primary"style="width: 130px;" @click="sure">确 定</el-button>
          <el-button style="width: 130px;" @click="dialogVisible = false">取 消</el-button>
        </div>
      </div>
    </v-modal>
  </div>
</template>
<script>
  import {
    waitme,
    clockRemind,
  } from '../../../../service/get-statistic-wp-data';
  import moment from 'moment';
  import { homePosition,//职位列表
    homePerson, //候选人列表
    settleStat, //可结案统计
    offerStat   //offer统计
  } from '../../../../service/RPO/get-business-data';
  import { analysisUrl } from '../../../../service/get-promission-data'
  export default {
    data() {
      return {
        date_time: '',
        total: '',
        total1: '',
        dialogVisible:false,
        tableData: [],
        checkList: [],
        page: 1,
        pageSize: 10,//每页条数
        pageSize1: 5,//每页条数
        currentPage: 1,
        type: 1, //类型(个人/团队)
        positionList: [],//职位列表数据
        checkBox: ["姓名", "期望薪资", "更新时间", "手机号", "推荐客户", "性别", "年龄", "推荐职位", "学历", "交付顾问", "经验", "流程"],//自定义统计项
        checkBox1:[],
        loading: false,
        action: [], //候选人列表流转状态
        isShowClockDate: false, //显示闹钟提醒时间
        alarmClock_data: {
          clock_id: "",
          remind_time: ""
        },
        alarmRules: {
          remind_time: [
            { required: true, message: '请选择提醒时间' }
          ]
        },
        //待办事项
        backlog: {
          icon: "&#xe60a;",
          title: "待办事项",
          data: []
        },
        //闹钟提醒
        alarmClock: {
          icon: "&#xe60c;",
          title: "提醒记录",
          data: []
        },
        //企业释放记录
        releaseRecord: {
          show: false,
          icon: "&#xe608;",
          title: "企业公共库TOP10",
          data: []
        },
        //offer统计
        offerStatistc: {
          show: false,
          //标题
          title: "Offer统计",
          //横坐标轴
          xAxis: {
            axis: [],
            name: "2018累计offer"
          },
          yAxis: {
            // name: "全部",
            type: 'value',
            interval: 100
          },
          //图例
          legend: {
            data: [],
            bottom: 10,
            orient: "horizontal",
            itemGap: 20
          },
          //数据
          data: [{
            name: "业绩",
            type: "line",
            //区域颜色
            areaStyle: {
              normal: {
                color: "#839cd5"
              }
            },
            //线条颜色
            lineStyle: {
              normal: {
                color: "#839cd5"
              }
            },
            //指示点的颜色
            itemStyle: {
              normal: {
                color: "#839cd5"
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#333'
              }
            },
            //让折现平滑显示
            smooth: false,
            data: []
          }]

        },
        //可结案统计
        finishStatistc: {
          show: false,
          //标题
          title: "Offer统计",
          //横坐标轴
          xAxis: {
            axis: [],
            name: "2018累计offer"
          },
          yAxis: {
            // name: "全部",
            type: 'value',
            interval: 100
          },
          //图例
          legend: {
            data: [],
            bottom: 10,
            orient: "horizontal",
            itemGap: 20
          },
          //数据
          data: [{
            name: "业绩",
            type: "line",
            //区域颜色
            areaStyle: {
              normal: {
                color: "#839cd5"
              }
            },
            //线条颜色
            lineStyle: {
              normal: {
                color: "#839cd5"
              }
            },
            //指示点的颜色
            itemStyle: {
              normal: {
                color: "#839cd5"
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#333'
              }
            },
            //让折现平滑显示
            smooth: false,
            data: []
          }]
        },
        // 电话个数分析
        analysisTelNum: {
          //标题
          title: "7月3~9日电话个数分析",
          //横坐标轴
          xAxis: {
            axis: ['3日', '4日', '5日', '6日', '7日', '8日', '9日']
          },
          //纵坐标单位
          yAxis: {
            name: "电话量(个数)"
          },
          //图例
          legend: {
            itemWidth: 80,
            data: [{
              name: "本部门最高",
              icon: "path://M1670.736842 161.684211L0 916.210526h215.578947L1670.736842 269.473684l754.526316 646.736842h161.68421L1670.736842 161.684211z"
            }, {
              name: "我的",
              icon: "path://M1670.736842 161.684211L0 916.210526h215.578947L1670.736842 269.473684l754.526316 646.736842h161.68421L1670.736842 161.684211z"
            }],
            bottom:10,
            orient: 'horizontal',
            itemGap: 20
          },
          //数据
          data: [{
            name: "本部门最高",
            type: "line",
            //区域颜色
            areaStyle: {
              normal: {
                color: "transparent"
              }
            },
            //线条颜色
            lineStyle: {
              normal: {
                color: "#d9b612",
                width: 3
              }
            },
            //指示点的颜色
            itemStyle: {
              normal: {
                color: "#d9b612",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#333'
              }
            },
            //让折现平滑显示
            smooth: false,
            data: [900, 899, 780, 820, 750, 800, 700]
          }, {
            name: "我的",
            type: "line",
            //区域颜色
            areaStyle: {
              normal: {
                color: "transparent"
              }
            },
            //线条颜色
            lineStyle: {
              normal: {
                color: "#49af7f",
                width: 3
              }
            },
            //指示点的颜色
            itemStyle: {
              normal: {
                color: "#49af7f",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#333'
              }
            },
            //让折现平滑显示
            smooth: false,
            data: [210, 300, 880, 320, 190, 300, 780]
          }]

        },
        // 电话时长分析
        analysisTelTime: {
          //标题
          title: "7月3~9日电话时长分析",
          //横坐标轴
          xAxis: {
            axis: ['3日', '4日', '5日', '6日', '7日', '8日', '9日']
          },
          //纵坐标单位
          yAxis: {
            name: "时长(分钟)"
          },
          //图例
          legend: {
            itemWidth: 80,
            data: [{
              name: "本部门最高",
              icon: "path://M1670.736842 161.684211L0 916.210526h215.578947L1670.736842 269.473684l754.526316 646.736842h161.68421L1670.736842 161.684211z"
            }, {
              name: "我的",
              icon: "path://M1670.736842 161.684211L0 916.210526h215.578947L1670.736842 269.473684l754.526316 646.736842h161.68421L1670.736842 161.684211z"
            }],
            bottom:10,
            orient: 'horizontal',
            itemGap: 20
          },
          //数据
          data: [{
            name: "本部门最高",
            type: "line",
            //区域颜色
            areaStyle: {
              normal: {
                color: "transparent"
              }
            },
            //线条颜色
            lineStyle: {
              normal: {
                color: "#d9b612",
                width: 3
              }
            },
            //指示点的颜色
            itemStyle: {
              normal: {
                color: "#d9b612",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#333'
              }
            },
            //让折现平滑显示
            smooth: false,
            data: [900, 899, 780, 820, 750, 800, 700]
          }, {
            name: "我的",
            type: "line",
            //区域颜色
            areaStyle: {
              normal: {
                color: "transparent"
              }
            },
            //线条颜色
            lineStyle: {
              normal: {
                color: "#49af7f",
                width: 3
              }
            },
            //指示点的颜色
            itemStyle: {
              normal: {
                color: "#49af7f",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#333'
              }
            },
            //让折现平滑显示
            smooth: false,
            data: [210, 300, 880, 320, 190, 300, 780]
          }]

        }
      };
    },
    computed: {

    },
    mounted() {
      this.fetchClockRemind(); //闹钟提醒
      this.fetchBacklog(); //待办事项
      this.settleStat(), //可结案统计
        this.offerStat(), //offer统计
        this.homePosition();
      this.homePerson();
    },
    methods: {
      typeNum2(){
        this.type = 2;
      },
      typeNum1(){
        this.type = 1;
      },
      //可结案统计
      async settleStat(){
        this.getDate();
        if(!this.date_time){
          this.$message({
            message: '请输入要查询的日期',
            type: 'warning'
          });
          return false;
        }else{
          this.date_time = moment(this.date_time).format('YYYY-MM');
          let param = {type: this.type,date_time: this.date_time};
          let res = await settleStat(param);
          let xAxis = res.data.list[0].settle_graph_data;
          //横轴,纵轴数据
          for(let i in xAxis){
            let obj = {xAxisData: i,yAxisData: xAxis[i]};
            this.finishStatistc.xAxis.axis.push(obj.xAxisData);
            this.finishStatistc.data[0].data.push(obj.yAxisData);
          }
        }
      },
      //可结案统计
      async offerStat(){
        this.getDate();
        if(!this.date_time){
          this.$message({
            message: '请输入要查询的日期',
            type: 'warning'
          });
          return false;
        }else{
          this.date_time = moment(this.date_time).format('YYYY-MM');
          let param = {type: this.type,date_time: this.date_time};
          let res = await offerStat(param);
          let xAxis = res.data.list[0].graph_data;
          //横轴,纵轴数据
          for(let i in xAxis){
            let obj = {xAxisData: i,yAxisData: xAxis[i]};
            this.offerStatistc.xAxis.axis.push(obj.xAxisData);
            this.offerStatistc.data[0].data.push(obj.yAxisData);
          }
        }
      },
      //获取当前月份
      getDate(){
        let date = new Date;
        let year = date.getFullYear();
        let m = date.getMonth() + 1;
        this.date_time = year +'-'+ (m < 10 ? "0" + m : m)// 查询时默认当前月
      },
      //职位列表
      async homePosition(page){
        //分页处理
        if (Number.isInteger(page)) {
          this.page = page;
        };
        this.currentPage = page;
        let res = await homePosition({page: this.page,pageSize: this.pageSize1});
        this.positionList = res.data.list;
        this.total1 = res.data.total;
      },
      //候选人列表
      async homePerson(page){
        //分页处理
        if (Number.isInteger(page)) {
          this.page = page;
        };
        this.currentPage = page;
        if(this.action.length<1){
          var param = {
            page: this.page,
            pageSize: this.pageSize
          };
        }else{
          var param = {
            action: this.action,
            page: this.page,
            pageSize: this.pageSize
          };
        }
        let res = await homePerson(param);
        this.tableData = res.data.list;
        this.total = res.data.total;
        // this.totalNumber = response.data.count;
      },
      //自定义统计项
      handleCheckedCitiesChange(value) {
        this.checkBox1 = value;
      },
      sure(){
        this.checkBox = this.checkBox1;
      },
      all(){
        this.action = [];
        this.homePerson();
      },
      join(){
        this.action = [0];
        this.homePerson();
      },
      recommand(){
        this.action = [1,2,3,4,-5,-6];
        this.homePerson();
      },
      customer(){
        this.action = [5,6,7,8,9,10,11,-7,-8];
        this.homePerson();
      },
      offer(){
        this.action = [12,13];
        this.homePerson();
      },
      arrival(){
        this.action = [14,15];
        this.homePerson();
      },
      canFinish(){
        this.action = [16];
        this.homePerson();
      },
      finished(){
        this.action = [17];
        this.homePerson();
      },
      giveUp(){
        this.action = [-1,-2,-3,-4,-9];
        this.homePerson();
      },
      // 闹钟提醒
      async fetchClockRemind() {
        let res = await clockRemind();

        if (res.status - 0 == 0) {
          for (let i of res.data.data) {
            this.alarmClock.data.push({
              content: i.content,
              more: {
                type: i.type,
                level: i.level,
              },
              id: i._id,
              clock_id: i.clock_id
            });
          }
        }
      },
      // 待办事项
      async fetchBacklog() {
        let res = await waitme();

        if (res.status == 0) {
          for (let i of res.data.data) {
            let url;

            if (i.href) {
              url = await analysisUrl(i.href.replace(/&/gi, "^"));
            }

            this.backlog.data.push({
              content: i.name,
              tip: i.type,
              id: url ? url.data.url : '',
            });

          }

        }

      },
      // 业绩分析
      // async fetchMonthPerformance() {
      //     let res = await monthPerformance(),
      //         data = res.data;

      //     if (res.status - 0 == 0) {

      //         // let month = data[0].date.split('-')[0].substring(4, 6);

      //         // // 标题
      //         // if (month == '10' || month == '11' || month == '12') {
      //         //     this.offerStatistc.title = month + '月业绩分析';

      //         // } else {
      //         //     this.offerStatistc.title = month.substring(1) + '月业绩分析';

      //         // }

      //         for (let i of data) {
      //             // 横轴
      //             let day = '',
      //                 day1 = '',
      //                 day2 = '',
      //                 split = '';

      //             split = i.date.split('-');

      //             if (split.length == 1) {
      //                 day = i.date.split('-')[0].substring(6) - 0
      //             } else {
      //                 day1 = i.date.split('-')[0].substring(6) - 0;
      //                 day2 = i.date.split('-')[1].substring(6) - 0;
      //                 day = day1 + '~' + day2;
      //             }

      //             this.offerStatistc.xAxis.axis.push(day);

      //             // 纵轴
      //             this.offerStatistc.data[0].data.push(i.performance.toFixed(2));

      //         }

      //         this.offerStatistc.show = true;
      //     }

      // },
      // 当前月拜访量
      async fetchThisMonthVisitCount() {
        let res = await thisMonthVisitCount(),
          date = res.data.date;

        if (res.status - 0 == 0) {

          let month = date[0].date.split('-')[0].substring(4, 6);

          this.monthVisit.xAxis.name = '拜访量/客户量=' + res.data.avg;

          // 标题
          if (month == '10' || month == '11' || month == '12') {
            this.monthVisit.title = month + '月拜访量分析';

          } else {
            this.monthVisit.title = month.substring(1) + '月拜访量分析';

          }

          for (let i of date) {
            // 横轴
            let day = '',
              day1 = '',
              day2 = '',
              split = '';

            split = i.date.split('-');

            if (split.length == 1) {
              day = i.date.split('-')[0].substring(6) - 0;
            } else {
              day1 = i.date.split('-')[0].substring(6) - 0;
              day2 = i.date.split('-')[1].substring(6) - 0;
              day = day1 + '~' + day2;
            }

            this.monthVisit.xAxis.axis.push(day);

            // 纵轴
            // 我的拜访
            this.monthVisit.data[0].data.push(i.myvist.toFixed(2));

            // 部门平均
            this.monthVisit.data[1].data.push(i.department.toFixed(2));

          }

          this.monthVisit.show = true;

        }

      },
      // 当月电话量分析
      async fetchThisMonthTelCount() {
        let res = await thisMonthTelCount(),
          date = res.data.date;

        if (res.status - 0 == 0) {

          let month = date[0].date.split('-')[0].substring(4, 6);

          this.monthPhone.xAxis.name = '电话量/客户量=' + res.data.avg;

          // 标题
          if (month == '10' || month == '11' || month == '12') {
            this.monthPhone.title = month + '月电话量分析';

          } else {
            this.monthPhone.title = month.substring(1) + '月电话量分析';

          }

          for (let i of date) {
            // 横轴
            let day = '',
              day1 = '',
              day2 = '',
              split = '';

            split = i.date.split('-');

            if (split.length == 1) {
              day = i.date.split('-')[0].substring(6) - 0;
            } else {
              day1 = i.date.split('-')[0].substring(6) - 0;
              day2 = i.date.split('-')[1].substring(6) - 0;
              day = day1 + '~' + day2;
            }

            this.monthPhone.xAxis.axis.push(day);

            // 纵轴
            // 时长
            this.monthPhone.data[0].data.push(i.phone_time.toFixed(2));

            // 电话量
            this.monthPhone.data[1].data.push(i.effective_tel_cnt.toFixed(2));
          }

          this.monthPhone.show = true;

        }

      },
      // 月份客户分析
      async fetchMonthCustomerAnalyze(type) {
        let res = await headerMonthPerformance({ pid: type }),
          data = [],
          count = 0,
          nums = 0;

        if (res.status - 0 == 0) {
          for (let i of res.data) {
            if (i.performance == -1) {
              ++count;
            }
          }

          if (count != res.data.length) {
            this.analysisPerformance[type - 1].show = true;

            for (let i of res.data) {
              if (i.performance != -1) {
                this.analysisPerformance[type - 1].xAxis.data.push(i.name);
                this.analysisPerformance[type - 1].series.data.push(i.performance);
              }
            }

          }

        }

      },
      // 闹钟事件
      customAlarmClock(scope) {
        // 自定义闹钟
        if (scope.clock_id != '') {
          this.isShowClockDate = true;
          this.alarmClock_data.clock_id = scope.clock_id;
        }

      },
      saveCustomDate() {
        this.$refs.clockForm.validate((valid) => {
          if (valid) {

            this.submitAlarm();


          } else {
            return false;
          }
        });
      },
      async submitAlarm() {
        let req_data = {
          id: this.alarmClock_data.clock_id,
          remind_time: this.alarmClock_data.remind_time
        }

        let res = await delayClock(req_data);

        if (res.status - 0 == 0) {
          this.$message({
            message: res.msg,
            type: 'success'
          });

          this.alarmClock_data.remind_time = '';
          this.isShowClockDate = false;
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }
    }
  };
</script>
<style lang='scss' scoped>
  @import "../../../../style/mixin.scss";
  @import "../../../../style/home.scss";
  .msg-status {
    color: gray;
  }
  .alarm_clock {
    .content_date {
      span {
        display: inline-block;
        line-height: 1.5;
        padding: 10px 0 10px;
      }
    }
  }
  .btn-subAlarm {
    width: 120px;
  }

  .home_message {
    min-height: 500px;
  }
  .el-checkbox{
    margin-bottom: 10px;
  }
  .c_table-bordered{
    // font-size:14px;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dfeceb;
    td{
      // word-break: break-all;
      text-align: center;
      height:30px;
      color:#1f3d3a;
      // i{
      //   float: left;
      //   margin-left: 10px;
      // }
    }
    .no_data{
      height:50px;
      line-height:50px;
      color:#5e837a;
      font-size:14px;
    }
    > thead tr th,
    > tbody tr td{
      border: 1px solid #dfeceb;
    }
    > thead{
      // height:40px;
      background: #eef1f6;
      min-width: 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      th{
        color: #8b87ac;
        font-weight: 400;
        height:30px;
      }
    }
    > thead tr th,
    > tbody tr td{
      padding: 3px 2px;
    }
    > tbody tr:last-child td{
      border-bottom: 0;
    }
    .cred {
      color:red;
    }
  }
  .table_content {
    margin-top: 20px;
    cursor: pointer;
    color: rgb(72, 106, 104);
    border-collapse: collapse;
    table-layout: fixed;
    td,th{
      border: 1px solid #9ea8b8;
      text-align: center;
      word-wrap: break-word;
      p{
        text-align: left;
        padding: 10px 20px 5px 40px;
      };
    };
    th{
      height: 40px;
    };
    .no_data{
      height:50px;
      line-height:50px;
      color:#5e837a;
      font-size:14px;
    };
    .td_delete{
      color: #4EC0A9;
      cursor: pointer;
    };
  };
</style>
<style lang="scss">
  .remind-time {
    .el-form-item__error {
      margin-left: 80px;
    }
  }
  .alarm_clock {
    .company_name {
      span.name {
        color: #606777;
      }
    }
  }
  .sec-backlog {
    @extend .alarm_clock;
  }
  .c-green {
    color: #4EC0A9;
  }
</style>
