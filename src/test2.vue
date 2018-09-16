<template>
  <div class="home">
    <div class="left clearfix">
      <div>
        <el-form :inline="true" label-width="100px">
          <el-button-group>
            <el-button type="plain" @click="typeNum1">个人报表</el-button>
            <el-button type="plain" @click="typeNum2">团队报表</el-button>
          </el-button-group>
          <el-form-item label="年月">
            <el-date-picker v-model="date_time" type="month" placeholder="选择月" @change="searchData"></el-date-picker>
          </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div style="display: flex;justify-content:flex-start;align-items:center;flex-wrap:wrap" class="clearfix">
        <div class="echartesStyle">
          <div class="textContent">
            <h4>Offer统计</h4>
            <p>静态Offer:<a href="javascript:;" class="yellowColor" @click="showTable()"> {{staticOffer}}</a>
              <span style="padding-left: 50px">累计Offer:</span><a href="javascript:;" class="yellowColor"
                                                                 @click="showTable1()"> {{sumOffer}}</a>
            </p>
            <p>年度Offer目标:<a href="javascript:;" class="yellowColor"></a></p>
            <p>Offer达成率:<a href="javascript:;" class="yellowColor"></a>
              <span style="padding-left: 50px">排名:</span>
              <a href="javascript:;" class="yellowColor"></a>
            </p>
          </div>
          <div id="myCharts" class="allCharts clearfix"></div>
        </div>
        <div class="echartesStyle">
          <div class="textContent">
            <h4>可结案统计</h4>
            <p>累计可结案:<a href="javascript:;" class="yellowColor" @click="showTable2()"> {{staticOffer}}</a></p>
            <p>年度可结案目标:<a href="javascript:;" class="yellowColor" @click=""> {{sumOffer}}</a></p>
            <p>可结案达成率:<a href="javascript:;" class="yellowColor"></a></p>
          </div>
          <div id="myCharts1" class="allCharts clearfix"></div>
        </div>
        <!-- 图标三 -->
        <div class="echartesStyle">
          <div class="textContent">
            <h4>过程统计</h4>
            <p>电话量:<a href="javascript:;" class="yellowColor" @click=""> {{staticOffer}}</a>
              <span style="padding-left: 50px">新建人才:</span>
              <a href="javascript:;" class="yellowColor"></a>
            </p>
            <p>下载量:<a href="javascript:;" class="yellowColor" @click=""> {{sumOffer}}</a>
              <span style="padding-left: 50px">下载成本:</span>
              <a href="javascript:;" class="yellowColor"></a>
            </p>
            <p>查看量/智能匹配量:<a href="javascript:;" class="yellowColor"></a></p>
          </div>
          <div id="myCharts2" class="allCharts clearfix"></div>
        </div>
        <!-- 图标四 -->
        <div class="echartesStyle">
          <div class="textContent">
            <h4>KPI统计</h4>
            <p>KPI:<a href="javascript:;" class="yellowColor" @click=""> {{staticOffer}}</a>
              <span style="padding-left: 50px">本月可结案:</span>
              <a href="javascript:;" class="yellowColor"></a>
            </p>
            <p>底薪:<a href="javascript:;" class="yellowColor" @click=""> {{sumOffer}}</a>
              <span style="padding-left: 50px">(离3500还差14280)</span>
            </p>
            <p>提成:<a href="javascript:;" class="yellowColor"></a>
              <span style="padding-left: 50px">当前薪资:</span>
              <a href="javascript:;" class="yellowColor"></a>
            </p>
          </div>
          <div id="myCharts3" class="allCharts clearfix"></div>
        </div>
        <!-- 图标五 -->
        <div class="echartesStyle">
          <div class="textContent">
            <h4>合伙人统计</h4>
            <p>人才量:<a href="javascript:;" class="yellowColor" @click=""> {{staticOffer}}</a>
              <span style="padding-left: 50px">交付中:</span>
              <a href="javascript:;" class="yellowColor"></a>
            </p>
            <p>合伙人:<a href="javascript:;" class="yellowColor" @click=""> {{sumOffer}}</a>
              <span style="padding-left: 50px">积分:</span>
            </p>
            <p>合伙人业绩:<a href="javascript:;" class="yellowColor"></a>
            </p>
          </div>
          <div id="myCharts4" class="allCharts clearfix"></div>
        </div>
      </div>

      <!-- <div class="charts">
          <div class="top_charts">
              <v-line :lineData="offerStatistc" class="visit_manage"></v-line>
              <v-line :lineData="finishStatistc" class="visit_manage"></v-line>
          </div>
      </div> -->
      <!-- 表格 -->
      <div class="main_source" style="margin: 24px 0 0 0;">
        <el-tabs type="border-card" class="main_table">
          <el-tab-pane>
            <span slot="label">进行中的职位</span>
            <div class="database_shows clearfix">
              <div class="clearfix">
                <el-table :data="positionList" border :stripe="true" :fit="true" v-loading="loading"
                          element-loading-text="正在加载">
                  <el-table-column prop="name" label="职位" align="center">
                    <template scope="scope">
                      <el-popover
                        ref="popover"
                        placement="top"
                        width="120"
                        trigger="hover">
                        <div>
                          <p>性质：{{scope.row.ka_name}}</p>
                          <p>KA顾问：{{scope.row.order_type}}</p>
                          <!-- <p>{{scope.row.name}}</p> -->
                        </div>
                      </el-popover>
                      <span v-popover:popover>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="order_name" label="企业订单" align="center"
                                   :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="needs" label="需求" align="center"
                                   :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="recom" label="人才推荐" align="center"></el-table-column>
                  <el-table-column prop="recom_succ" label="推荐通过" align="center"></el-table-column>
                  <el-table-column prop="offer" label="Offer" align="center"></el-table-column>
                  <el-table-column prop="giveUp" label="放弃" align="center"></el-table-column>
                  <el-table-column prop="arrive" label="到岗" align="center"></el-table-column>
                  <el-table-column prop="is_closCase" label="可结案" align="center"></el-table-column>
                  <el-table-column prop="closCase" label="结案" align="center"></el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination layout="total, prev, pager, next, jumper" :current-page.sync="currentPage1"
                               :total="Number(total1)" @current-change="homePosition" class="fr"
                               style="margin-top:30px;">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="main_source" style="margin: 24px 0 0 0;">
        <el-tabs type="border-card" class="main_table">
          <el-tab-pane class="clearfix">
            <span slot="label">候选人动态</span>
            <div class="totalBtn fl">
              <template v-for="(item,index) in tabChoice" :tack-by="index">
                <p @click="showTab(index)" :class="{'actives':activesIndex===index}">{{item}}</p>
                <div class="triangle-right trangle"
                     :class="{'actives1':activesIndex===index,'triangle-hide':index===5}"></div>
                <div class="triangle-right floatCover"></div>
              </template>
              <!--<p><span @click="all">所有</span></p>-->
              <!--<div class="triangle-right"></div>-->
              <!--<div class="triangle-right floatCover"></div>-->
              <!--<p><span @click="join">加入职位</span></p>-->
              <!--<div class="triangle-right"></div>-->
              <!--<div class="triangle-right floatCover"></div>-->
              <!--<p><span @click="recommand">人才推荐</span></p>-->
              <!--<div class="triangle-right"></div>-->
              <!--<div class="triangle-right floatCover"></div>-->
              <!--<p><span @click="customer">客户面试</span></p>-->
              <!--<div class="triangle-right"></div>-->
              <!--<div class="triangle-right floatCover"></div>-->
              <!--<p><span @click="offer">offer</span></p>-->
              <!--<div class="triangle-right"></div>-->
              <!--<div class="triangle-right floatCover"></div>-->
              <!--<p><span @click="arrival">到岗</span></p>-->
              <!--<div class="triangle-right"></div>-->
              <!--<div class="triangle-right floatCover"></div>-->
              <!--<p><span @click="canFinish">可结案</span></p>-->
              <!--<div class="triangle-right"></div>-->
              <!--<div class="triangle-right floatCover"></div>-->
              <!--<p><span @click="finished">结案</span></p>-->
              <!--<div class="triangle-right"></div>-->
              <!--<div class="triangle-right floatCover"></div>-->
              <!--<p><span @click="giveUp">放弃</span></p>-->
            </div>
            <div class="fr setBtn">
              <p icon="el-icon-search" @click="dialogVisible=true"><i class="el-icon-setting"></i></p>
            </div>
            <table class="c_table-bordered " border="1" cellpadding="0" cellspacing="0" width="100%" v-loading="loading"
                   element-loading-text="正在加载">
              <thead>
              <!-- <tr>
                <td colspan="8" >

                </td>
              </tr> -->
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
                <td v-for="(item, index) of checkBox" class="yellowColor" v-if="item.indexOf('姓名') > -1">
                  {{row.person_info.name}}
                </td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('手机号') > -1">
                  <el-popover
                    placement="top"
                    width="200"
                    trigger="hover">
                    <span>{{showTel}}</span>
                    <span slot="reference" style="cursor: pointer" @mouseover="showHover(row)">{{row.person_info.mobile}}</span>
                  </el-popover>
                </td>
                <td>
                  <span v-for="(item, index) of checkBox" v-if="item.indexOf('地区') > -1">{{row.person_info.location+'-'}}</span>
                  <span v-for="(item, index) of checkBox"
                        v-if="item.indexOf('性别') > -1">{{row.person_info.gender+'-'}}</span>
                  <span v-for="(item, index) of checkBox"
                        v-if="item.indexOf('年龄') > -1">{{row.person_info.age+'-'}}</span>
                  <span v-for="(item, index) of checkBox"
                        v-if="item.indexOf('学历') > -1">{{row.person_info.degree+'-'}}</span>
                  <span v-for="(item, index) of checkBox"
                        v-if="item.indexOf('经验') > -1">{{row.person_info.work_year}}</span>
                </td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('推荐企业') > -1">
                  <a href="javascript:;" class="cls-primary overflow yellowColor" @click="goToCompany(row)">{{row.recom_company}}</a>
                </td>
                <td v-for="(item, index) of checkBox" class="yellowColor" v-if="item.indexOf('推荐职位') > -1">
                  {{row.recom_job}}
                </td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('交付顾问') > -1">{{row.adviser}}</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('流程') > -1">{{row.status_name}}</td>
                <td v-for="(item, index) of checkBox" v-if="item.indexOf('更新时间') > -1">
                  <el-popover
                    placement="top"
                    width="300"
                    style="cursor: pointer"
                    trigger="hover">
                    <div>
                      <p>{{timeData}} <span> {{timeName}}</span></p>
                      <p><span>{{detailStatus}} </span> {{detail}}</p>
                    </div>
                    <span slot="reference" style="cursor: pointer"
                          @mouseover="showHover(row)">{{row.update_time}}</span>
                  </el-popover>
                </td>
              </tr>
              </tbody>
              <tbody v-else>
              <tr>
                <td :colspan="8" class="no_data">暂无数据</td>
              </tr>
              </tbody>
            </table>
            <!-- 分页 -->
            <el-pagination layout="total, prev, pager, next, jumper" :current-page.sync="currentPage"
                           :total="Number(total)" @current-change="homePerson" class="fr" style="margin-top:30px;">
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
          <router-link to="/business/alarmClock?active=reminderLog" slot="checkMore" v-if="alarmClock.data.length > 0">
            查看更多
          </router-link>
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
      <v-tip :icon="releaseRecord.icon" :title="releaseRecord.title" :data="releaseRecord.data"
             v-if="releaseRecord.show">
        <template scope="scope" slot="msg">
          <span>{{scope.text}}</span>
        </template>
        <router-link to="/customer/sourcePool/commonSource" slot="checkMore" v-if="releaseRecord.data.length > 0">查看更多
        </router-link>
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
    <v-modal :visible.sync="dialogVisible" width="30%" class="send_dialog" :height="240" :width="550">
      <template slot="title">自定义统计项</template>
      <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city" style="    margin-left: 10px;">{{city}}
          </el-checkbox>
        </el-checkbox-group>
        <div style="margin-top: 22px;text-align: center">
          <el-button type="primary" style="width: 130px;" @click="sure">确 定</el-button>
          <el-button style="width: 130px;" @click="dialogVisible = false">取 消</el-button>
        </div>
      </div>
    </v-modal>
    <!-- offer统计弹框 -->
    <v-modal :visible.sync="isVisible">
      <template slot="title" v-if="this.num == 1">静态Offer</template>
      <template slot="title" v-else>累计Offer</template>
      <v-offer :dateTime="date_time" :myType="type" :num="num"></v-offer>
    </v-modal>
    <!-- 可结案统计统计弹框 -->
    <v-modal :visible.sync="isSumCanFinish">
      <template slot="title">累计可结案</template>
      <v-sumCanFinish :dateTime="date_time" :myType="type"></v-sumCanFinish>
    </v-modal>
  </div>
</template>
<script>
  import {waitme, clockRemind,} from '../../../../service/get-statistic-wp-data';
  import moment from 'moment';
  import echarts from "echarts";
  import {
    homePosition,//职位列表
    homePerson, //候选人列表
    settleStat, //可结案统计
    offerStat,  //offer统计
    getAccumulativeOfferList,//累计offer列表
    staticOfferList //静态offer列表
  } from '../../../../service/RPO/get-business-data';
  import {analysisUrl} from '../../../../service/get-promission-data'

  const cityOptions = ['姓名', '手机号', '地区', '性别', '年龄', '学历', '经验', '期望薪资', '推荐企业', '推荐职位', '交付顾问', '流程', '更新时间'];
  export default {
    components: {
      'v-offer': require('@/components/RPO/business/offer.vue'), //考核人员
      'v-sumCanFinish': require('@/components/RPO/business/sumCanFinish.vue'), //考核人员
    },
    data () {
      return {
        activesIndex: 0,
        date_time: '',
        total: '',
        staticOffer: '', //静态累计Offer
        sumOffer: '',  //累计Offer
        total1: '',
        dialogVisible: false,
        isVisible: false,
        isSumCanFinish: false,
        tableData: [],
        itemData: [],
        checkList: cityOptions,
        page: 1,
        page1: 1,
        showTel: '',
        pageSize: 10,//每页条数
        pageSize1: 5,//每页条数
        currentPage: 1,
        currentPage1: 1,
        myChart: {},
        myChart1: {},
        myChart2: {},
        myChart3: {},
        myChart4: {},
        checkAll: false,
        isIndeterminate: true,
        type: 1, //类型(个人/团队)
        num: 0,
        timeData: '', //hover数据
        timeName: '',
        detail: '',
        detailStatus: '',
        allBtn: [],
        positionList: [],//职位列表数据
        checkBox: ['姓名', '手机号', '地区', '性别', '年龄', '学历', '经验', '期望薪资', '推荐企业', '推荐职位', '交付顾问', '流程', '更新时间'],//自定义统计项
        checkBox1: [],
        cities: cityOptions,
        loading: false,
        action: [], //候选人列表流转状态
        isShowClockDate: false, //显示闹钟提醒时间
        alarmClock_data: {
          clock_id: "",
          remind_time: ""
        },
        alarmRules: {
          remind_time: [
            {required: true, message: '请选择提醒时间'}
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
        option: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['']
          },
          toolbox: {
            show: true,
            feature: {}
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              name: "2018累计offer",
              nameLocation: 'middle',
              nameGap: 35,
              data: []
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Offer统计',
              type: 'line',
              // stack: '总量',
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: []
            }
          ]
        },
        //可结案统计
        finishStatistc: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['']
          },
          toolbox: {
            show: true,
            feature: {}
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              name: "2018累计可结案",
              nameLocation: 'middle',
              nameGap: 35,
              data: []
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Offer统计',
              type: 'line',
              // stack: '总量',
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: []
            }
          ]
        },

        //tabChoice
        tabChoice: ['所有', '加入项目', '简历推荐', '客户面试', 'offer', '到岗', '可结案', '结案', '放弃']
      };
    },
    computed: {},
    mounted () {
      this.fetchClockRemind(); //闹钟提醒
      this.fetchBacklog(); //待办事项
      this.showEcharts();//echartes
      this.getDate();
      this.searchData();
      // this.settleStat(), //可结案统计
      // this.offerStat(), //offer统计
      // this.homePosition();
      // this.homePerson();
      // this.showEcharts();//echartes
      // this.getAccumulativeOfferList();
      // this.staticOfferList();
    },
    methods: {
      searchData () {
        this.settleStat(), //可结案统计
          this.offerStat(), //offer统计
          this.homePosition();
        this.homePerson();
        this.getAccumulativeOfferList();
        this.staticOfferList();
      },
      typeNum2 () {
        this.type = 2;
        this.searchData();
      },
      typeNum1 () {
        this.type = 1;
        this.searchData();
      },
      //单独写图表
      showEcharts () {
        this.myChart = echarts.init(document.getElementById('myCharts'));
        // this.myChart.setOption(this.option);
        this.myChart1 = echarts.init(document.getElementById('myCharts1'));
        // this.myChart1.setOption(this.finishStatistc);
        this.myChart2 = echarts.init(document.getElementById('myCharts2'));
        // this.myChart2.setOption(this.finishStatistc);
        this.myChart3 = echarts.init(document.getElementById('myCharts3'));
        // this.myChart3.setOption(this.finishStatistc);
        this.myChart4 = echarts.init(document.getElementById('myCharts4'));
        // this.myChart4.setOption(this.finishStatistc);
      },
      //累计offer列表
      async getAccumulativeOfferList () {
        let res = await getAccumulativeOfferList({type: this.type, date_time: this.date_time});
        this.sumOffer = res.data.total;
      },
      //静态offer列表
      async staticOfferList () {
        let res = await staticOfferList({type: this.type, date_time: this.date_time});
        this.staticOffer = res.data.total;
      },
      //可结案统计
      async settleStat () {
        // this.getDate();
        if (!this.date_time) {
          this.$message({
            message: '请输入要查询的日期',
            type: 'warning'
          });
          return false;
        } else {
          this.date_time = moment(this.date_time).format('YYYY-MM');
          let param = {type: this.type, date_time: this.date_time};
          let res = await settleStat(param);
          let xAxis = res.data.list[0].settle_graph_data;
          //横轴,纵轴数据
          this.finishStatistc.xAxis[0].data = [];
          this.finishStatistc.series[0].data = [];
          for (let i in xAxis) {
            let obj = {xAxisData: i, yAxisData: xAxis[i]};
            this.finishStatistc.xAxis[0].data.push(obj.xAxisData);
            this.finishStatistc.series[0].data.push(obj.yAxisData);
          }
          ;
          this.myChart1.setOption(this.finishStatistc);
          this.myChart2.setOption(this.finishStatistc);
          this.myChart3.setOption(this.finishStatistc);
          this.myChart4.setOption(this.finishStatistc);
        }
      },
      //可结案统计
      async offerStat () {
        // this.getDate();
        if (!this.date_time) {
          this.$message({
            message: '请输入要查询的日期',
            type: 'warning'
          });
          return false;
        } else {
          this.date_time = moment(this.date_time).format('YYYY-MM');
          let param = {type: this.type, date_time: this.date_time};
          let res = await offerStat(param);
          let xAxis = res.data.list[0].graph_data;
          this.option.xAxis[0].data = [];
          this.option.series[0].data = [];
          //横轴,纵轴数据
          for (let i in xAxis) {
            let obj = {xAxisData: i, yAxisData: xAxis[i]};
            this.option.xAxis[0].data.push(obj.xAxisData);
            this.option.series[0].data.push(obj.yAxisData);
          }
          ;
          this.myChart.setOption(this.option);
        }
      },
      //获取当前月份
      getDate () {
        let date = new Date;
        let year = date.getFullYear();
        let m = date.getMonth() + 1;
        this.date_time = year + '-' + (m < 10 ? "0" + m : m)// 查询时默认当前月
      },
      //职位列表
      async homePosition (page) {
        //分页处理
        if (Number.isInteger(page)) {
          this.page1 = page;
        }
        ;
        this.currentPage1 = page;
        let res = await homePosition({page: this.page1, pageSize: this.pageSize1});
        this.positionList = res.data.list;
        this.total1 = res.data.total;
      },
      //候选人列表
      async homePerson (page) {
        //分页处理
        if (Number.isInteger(page)) {
          this.page = page;
        }
        ;
        this.currentPage = page;
        if (this.action.length < 1) {
          var param = {
            page: this.page,
            pageSize: this.pageSize
          };
        } else {
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
      handleCheckAllChange (event) {
        this.checkList = event.target.checked ? cityOptions : [];
        this.checkBox1 = this.checkList;
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange (value) {
        this.checkBox1 = value;
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      //确定
      sure () {
        this.checkBox = this.checkBox1;
        this.dialogVisible = false;
      },
      //hover
      showHover (row) {
        this.showTel = row.dial_time;
        this.timeData = row.update_content.info.date_time;
        this.timeName = row.update_content.info.user_name;
        this.detailStatus = row.update_content.add_status;
        this.detail = row.update_content.splice_content.text;
      },
      // 推荐企业跳转
      goToCompany (row) {
        window.open(`/customer/companyDetail?company_id=${row.company_id.$oid}`);
      },
      showTable () {
        this.itemData = this.itemData1;
        this.isVisible = true;
        this.num = 1;
      },
      showTable1 () {
        this.itemData = this.itemData2;
        this.isVisible = true;
        this.num = 2;
      },
      showTable2 () {
        this.isSumCanFinish = true;
      },
      all () {
        this.action = [];
        this.homePerson();
      },
      join () {
        this.action = [0];
        this.homePerson();
      },
      showTab (index) {
        switch (index) {
          case 0:
            this.activesIndex = index;
            this.action = [];
            this.homePerson();
            break
          case 1:
            this.activesIndex = index;
            this.action = [0];
            this.homePerson();
            break
          case 2:
            this.activesIndex = index;
            this.action = [1, 2, 3, 4, -5, -6];
            this.homePerson();
            break
          case 3:
            this.activesIndex = index;
            this.action = [5, 6, 7, 8, 9, 10, 11, -7, -8];
            this.homePerson();
          case 4:
            this.activesIndex = index;
            this.action = [12, 13];
            this.homePerson();
            break
          case 5:
            this.activesIndex = index;
            this.action = [14, 15];
            this.homePerson();
            break
          case 6:
            this.activesIndex = index;
            this.action = [16];
            this.homePerson();
          case 7:
            this.activesIndex = index;
            this.action = [17];
            this.homePerson();
          case 8:
            this.activesIndex = index;
            this.action = [-1, -2, -3, -4, -9];
            this.homePerson();
        }
      },
      // recommand(){
      //   this.action = [1,2,3,4,-5,-6];
      //   this.homePerson();
      // },
      // customer(){
      //   this.action = [5,6,7,8,9,10,11,-7,-8];
      //   this.homePerson();
      // },
      // offer(){
      //   this.action = [12,13];
      //   this.homePerson();
      // },
      // arrival(){
      //   this.action = [14,15];
      //   this.homePerson();
      // },
      // canFinish(){
      //   this.action = [16];
      //   this.homePerson();
      // },
      // finished(){
      //   this.action = [17];
      //   this.homePerson();
      // },
      // giveUp(){
      //   this.action = [-1,-2,-3,-4,-9];
      //   this.homePerson();
      // },
      // 闹钟提醒
      async fetchClockRemind () {
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
      async fetchBacklog () {
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
      // 闹钟事件
      customAlarmClock (scope) {
        // 自定义闹钟
        if (scope.clock_id != '') {
          this.isShowClockDate = true;
          this.alarmClock_data.clock_id = scope.clock_id;
        }

      },
      saveCustomDate () {
        this.$refs.clockForm.validate((valid) => {
          if (valid) {

            this.submitAlarm();


          } else {
            return false;
          }
        });
      },
      async submitAlarm () {
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

  .el-checkbox {
    margin-bottom: 10px;
  }

  .c_table-bordered {
    // font-size:14px;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dfeceb;
    td {
      // word-break: break-all;
      text-align: center;
      height: 30px;
      color: #1f3d3a;
      // i{
      //   float: left;
      //   margin-left: 10px;
      // }
    }
    .no_data {
      height: 50px;
      line-height: 50px;
      color: #5e837a;
      font-size: 14px;
    }
    > thead tr th,
    > tbody tr td {
      border: 1px solid #dfeceb;
    }
    > thead {
      // height:40px;
      background: #eef1f6;
      min-width: 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      th {
        color: #8b87ac;
        font-weight: 400;
        height: 30px;
      }
    }
    > thead tr th,
    > tbody tr td {
      padding: 3px 2px;
    }
    > tbody tr:last-child td {
      border-bottom: 0;
    }
    .cred {
      color: red;
    }
  }

  .table_content {
    margin-top: 20px;
    cursor: pointer;
    color: rgb(72, 106, 104);
    border-collapse: collapse;
    table-layout: fixed;
    td, th {
      border: 1px solid #9ea8b8;
      text-align: center;
      word-wrap: break-word;
      p {
        text-align: left;
        padding: 10px 20px 5px 40px;
      }
    ;
    }
  ;
    th {
      height: 40px;
    }
  ;
    .no_data {
      height: 50px;
      line-height: 50px;
      color: #5e837a;
      font-size: 14px;
    }
  ;
    .td_delete {
      color: #4EC0A9;
      cursor: pointer;
    }
  ;
  }

  ;
  .yellowColor {
    color: #F8AC01 !important;
  }

  ;
  .totalBtn {
    display: flex;
    width: 80%;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    margin-bottom: 15px;
    p {
      flex-grow: 1;
      padding: 8px 0;
      width: 80px;
      z-index: 0;
      background-color: #eee;
    }
  ;
    p:hover {
      color: #F8AC01;
      cursor: pointer;
    }
  ;
    .actives {
      color: #fff;
      background-color: #F8AC01;
    }
  ;
    .actives1 {
      border-left-color: #F8AC01 !important;
    }
  ;
    .triangle-right {
      width: 0;
      height: 0;
      border: solid 8px #eee;
      border-top: solid 6px transparent;
      border-bottom: solid 6px transparent;
      border-right: 0;
      margin-right: -4px;
      z-index: 2;
    }
  ;
    .triangle-right.triangle-hide {
      // display: none;
      opacity: 0 !important;
    }
  ;
    .floatCover {
      width: 0;
      height: 0;
      z-index: 1;
      border: solid 8px #fff;
      border-top: solid 6px transparent;
      border-bottom: solid 6px transparent;
      border-right: 0;
      margin-right: -8px;
    }
  }

  ;
  .setBtn {
    width: 38px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    border: 1px solid #eee;
    border-radius: 50%;
    cursor: pointer;
  }

  ;
  .echartesStyle {
    padding: 10px;
    margin: 10px 10px 0 0;
    border: none;
    list-style: none;
    font-style: normal;
    background-color: #fff;
    font-family: "Microsoft Yahei";
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    width: 32%;
    height: 390px;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 10px 0px #ccc;
    box-shadow: 0 0 10px 0px #ccc;
    .allCharts {
      min-height: 240px;
      min-width: 280px;
      display: flex;
      flex: 1 1 50%;
    }
    .textContent {
      h4 {
        text-align: center;
        margin-bottom: 10px;
      }
    ;
      p {
        margin-bottom: 10px;
      }
    ;
    }
  }
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
