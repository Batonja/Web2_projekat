import React, { PureComponent } from 'react'
import ReactEcharts from 'echarts-for-react';
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'

const styles = (theme) => ({

    lineChart: {
        [theme.breakpoints.down("xs", "sm", 'md')]: {
            width: '90%'
        },
        width: '100%',
        height: '400px'
    },
    lineChartContainer: {
        display: 'flex',
        //alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down("xs", "sm", 'md')]: {
            width: '90%'
        },
        width: '90%',
        height: '400px',
        background: '#27293D',
        borderRadius: '10px',
        margin: '20px 0 0 0',
    }
})

class LineChart extends PureComponent {
    constructor(props) {
        super(props);

        var state = {
            option: this.getOption()
        }
        this.state = state;
    }
    componentDidMount() {

    }

    getOption = () => {
        const { chartTitle } = this.props
        const { sygnalType } = this.props
        var data = []
        //TEST DATA
        var dataWeekly = [120, 200, 150, 80, 70, 110, 130]
        var dataMonthly = [120, 200, 150, 80, 70, 110, 130, 15, 90, 21, 325, 260, 120, 200, 150, 80, 70, 110, 130, 15, 90, 21, 325, 260, 120, 200, 150, 80, 70, 110, 350]
        var dataYearly = [120, 200, 150, 80, 70, 110, 130, 15, 90, 21, 325, 260]

        var date = new Date();
        var echarts = require("echarts");

        switch (sygnalType) {
            case 'weekly':
                for (var i = 6, j = 0; i >= 0; i--, j++) {
                    let temp = moment().subtract(i, 'days').format('dddd').toString()
                    data.push([temp, dataWeekly[j]])
                }
                break
            case 'monthly':
                for (var i = 30, j = 0; i >= 0; i--, j++) {
                    let temp = moment().subtract(i, 'days').format('MMMM Do').toString()
                    data.push([temp, dataMonthly[j]])
                }
                break
            case 'yearly':
                for (var i = 11, j = 0; i >= 0; i--, j++) {
                    let temp = moment().subtract(i, 'month').format('MMM').toString()
                    data.push([temp, dataYearly[j]])
                }
                break
            default:
                console.log("unexisting signal")
                return {}
        }

        return {
            title: {
                text: chartTitle,
                textStyle: {
                    fontFamily: 'lato',
                    color: 'white',
                    fontSize: 25
                },
                padding: 20

            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'white',
                    formatter: (function (value, index) {
                        return value;
                    })
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'white'
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                data: data,
                type: 'line',
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#ff0d00'
                    }, {
                        offset: 1,
                        color: '#ffaa00'
                    }])
                },
            }],

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.lineChartContainer}>
                <ReactEcharts
                    option={this.state.option}
                    className={classes.lineChart}
                    style={{ height: '400px' }}
                />
            </div>
        )
    }
}
export default withStyles(styles)(LineChart)
