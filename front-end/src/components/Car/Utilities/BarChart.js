import React, { PureComponent } from 'react'
import ReactEcharts from 'echarts-for-react';
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'

const styles = (theme) => ({

    barChart: {
        [theme.breakpoints.down("xs", "sm", 'md')]: {
            width: '90%'
        },
        width: '100%',
        height: '400px'
    },
    barChartContainer: {
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
        margin: '0 0 20px 0'
    }
})

class BarChart extends PureComponent {
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
        var days = []
        var data = [120, 200, 150, 80, 70, 110, 130, 15, 90, 21, 325, 260]

        var date = new Date();

        for (var i = 11, j = 0; i >= 0; i--, j++) {
            //let temp = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000*30));
            let temp = moment().subtract(i, 'month').format('MMM').toString()
            days.push([temp, data[j]])
        }
        const { chartTitle } = this.props
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
                }
            },
            series: [{
                data: days,
                type: 'bar'
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
            <div className={classes.barChartContainer}>
                <ReactEcharts
                    option={this.state.option}
                    className={classes.barChart}
                    style={{ height: '400px' }}
                />
            </div>
        )
    }
}
export default withStyles(styles)(BarChart)
