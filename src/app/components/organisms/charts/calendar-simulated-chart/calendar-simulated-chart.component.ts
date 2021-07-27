import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
    selector: 'nwn-calendar-simulated-chart',
    templateUrl: './calendar-simulated-chart.component.html',
    styleUrls: ['./calendar-simulated-chart.component.css'],
})
export class CalendarSimulatedChartComponent implements OnInit {
    private data = [
        {
            date: '2021-01-06',
            month: 'Jan',
            year: '2021',
            name: 'W1 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '0.9',
        },
        {
            date: '2021-01-13',
            month: 'Jan',
            year: '2021',
            name: 'W2 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.7',
        },
        {
            date: '2021-01-20',
            month: 'Jan',
            year: '2021',
            name: 'W3 2021',
            discount: '.32',
            holiday: true,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-01-27',
            month: 'Jan',
            year: '2021',
            name: 'W4 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-02-03',
            month: 'Feb',
            year: '2021',
            name: 'W5 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-02-10',
            month: 'Feb',
            year: '2021',
            name: 'W6 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-02-17',
            month: 'Feb',
            year: '2021',
            name: 'W7 2021',
            discount: '.32',
            holiday: true,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-02-24',
            month: 'Feb',
            year: '2021',
            name: 'W8 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-03-04',
            month: 'Mar',
            year: '2021',
            name: 'W9 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-03-11',
            month: 'Mar',
            year: '2021',
            name: 'W10 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-03-18',
            month: 'Mar',
            year: '2021',
            name: 'W11 2021',
            discount: '.32',
            holiday: false,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-03-25',
            month: 'Mar',
            year: '2021',
            name: 'W12 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-04-07',
            month: 'Apr',
            year: '2021',
            name: 'W13 2021',
            discount: '0',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-04-14',
            month: 'Apr',
            year: '2021',
            name: 'W14 2021',
            discount: '0',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-04-21',
            month: 'Apr',
            year: '2021',
            name: 'W15 2021',
            discount: '0',
            holiday: false,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-04-28',
            month: 'Apr',
            year: '2021',
            name: 'W16 2021',
            discount: '0',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-05-05',
            month: 'May',
            year: '2021',
            name: 'W17 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-05-12',
            month: 'May',
            year: '2021',
            name: 'W18 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-05-19',
            month: 'May',
            year: '2021',
            name: 'W19 2021',
            discount: '.32',
            holiday: false,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-05-26',
            month: 'May',
            year: '2021',
            name: 'W20 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-06-03',
            month: 'Jun',
            year: '2021',
            name: 'W21 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-06-10',
            month: 'Jun',
            year: '2021',
            name: 'W22 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-06-17',
            month: 'Jun',
            year: '2021',
            name: 'W23 2021',
            discount: '.32',
            holiday: true,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-06-24',
            month: 'Jun',
            year: '2021',
            name: 'W24 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-07-07',
            month: 'Jul',
            year: '2021',
            name: 'W25 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-07-14',
            month: 'Jul',
            year: '2021',
            name: 'W26 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-07-21',
            month: 'Jul',
            year: '2021',
            name: 'W27 2021',
            discount: '.32',
            holiday: true,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-07-28',
            month: 'Jul',
            year: '2021',
            name: 'W28 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-08-04',
            month: 'Aug',
            year: '2021',
            name: 'W29 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-08-11',
            month: 'Aug',
            year: '2021',
            name: 'W30 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-08-18',
            month: 'Aug',
            year: '2021',
            name: 'W31 2021',
            discount: '.32',
            holiday: true,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-08-25',
            month: 'Aug',
            year: '2021',
            name: 'W32 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-09-03',
            month: 'Sep',
            year: '2021',
            name: 'W33 2021',
            discount: '0',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-09-10',
            month: 'Sep',
            year: '2021',
            name: 'W34 2021',
            discount: '0',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-09-17',
            month: 'Sep',
            year: '2021',
            name: 'W35 2021',
            discount: '0',
            holiday: true,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-09-24',
            month: 'Sep',
            year: '2021',
            name: 'W36 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-10-07',
            month: 'Oct',
            year: '2021',
            name: 'W37 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-10-14',
            month: 'Oct',
            year: '2021',
            name: 'W38 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-10-21',
            month: 'Oct',
            year: '2021',
            name: 'W39 2021',
            discount: '.32',
            holiday: true,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-10-28',
            month: 'Oct',
            year: '2021',
            name: 'W40 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-11-03',
            month: 'Nov',
            year: '2021',
            name: 'W41 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-11-10',
            month: 'Nov',
            year: '2021',
            name: 'W42 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-11-17',
            month: 'Nov',
            year: '2021',
            name: 'W43 2021',
            discount: '.32',
            holiday: true,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-11-24',
            month: 'Nov',
            year: '2021',
            name: 'W44 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },

        {
            date: '2021-12-07',
            month: 'Dec',
            year: '2021',
            name: 'W45 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1.7',
        },
        {
            date: '2021-12-14',
            month: 'Dec',
            year: '2021',
            name: 'W46 2021',
            discount: '.15',
            holiday: false,
            seasonality: 'low',
            roi: '1.2',
        },
        {
            date: '2021-12-21',
            month: 'Dec',
            year: '2021',
            name: 'W47 2021',
            discount: '.32',
            holiday: true,
            seasonality: 'med',
            roi: '1.5',
        },
        {
            date: '2021-12-28',
            month: 'Dec',
            year: '2021',
            name: 'W48 2021',
            discount: '.25',
            holiday: false,
            seasonality: 'high',
            roi: '1',
        },
    ];

    private processedData = this.data.map((d) => ({
        date: new Date(d.date),
        timePeriod: moment(d.date).format('D MMM'),
        name: d.name,
        month: d.month,
        year: d.year,
        discount: d.discount,
        seasonality: d.seasonality,
        holiday: d.holiday,
        roi: d.roi,
    }));

    private svg: any;
    private numberOfWeeks = 48;
    private margin = { top: 100, right: 50, bottom: 50, left: 50 };
    private boundingWidth = 700 - this.margin.left - this.margin.right;
    private boundingHeight = 450 - this.margin.top - this.margin.bottom;

    ngOnInit(): void {
        this.createSvg();
        this.drawBars(this.processedData);
        console.log(this.processedData);
    }

    private createSvg(): void {
        this.svg = d3
            .select('#calendarSimulatedChart')
            .append('svg')
            // Wrapper
            .attr('width', this.boundingWidth + this.margin.left + this.margin.right)
            .attr('height', this.boundingHeight + this.margin.top + this.margin.bottom)
            // Bounds starting at 0X0 from margin left and top
            .append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    }

    private drawBars(data: any[]): void {
        const boundingHeight = this.boundingHeight;
        // Maxim value in the data to find the maximum bound dynamically
        const maximumDiscountInData = getMaxDiscount();
        function getMaxDiscount() {
            return Math.max(...data.map((d) => d.discount));
        }
        // Maxim value in the data to find the maximum bound dynamically
        const maximumROIInData = getMaxROI();
        function getMaxROI() {
            return Math.max(...data.map((d) => d.roi));
        }

        // List of groups
        const groups = data.map((d) => d.timePeriod);

        // List of unique months
        const months = data.map((d) => d.month);

        // Add X Axis - Time Period
        const xScale = d3
            .scaleBand()
            .domain(groups)
            .range([0, this.boundingWidth])
            .paddingInner(0.25)
            .paddingOuter(0.25);

        // Add X Axis - Months
        const xMonthScale = d3
            .scaleBand()
            .domain(months)
            .range([0, this.boundingWidth])
            .paddingInner(0.25)
            .paddingOuter(0.25);
        const xAxisGenerator = d3.axisBottom(xMonthScale);
        this.svg
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${this.boundingHeight})`)
            .call(xAxisGenerator)
            .call(d3.axisBottom(xMonthScale).tickSizeOuter(0));
        // X Axis Year
        this.svg
            .append('g')
            .selectAll('g')
            .data(data.filter((d, i) => !(i % 4)))
            .join('g')
            .append('text')
            .attr('class', 'label')
            .attr('x', (d: any) => (xMonthScale(d.month) ?? 0) + 6)
            .attr('y', this.boundingHeight + 32)
            .attr('text-anchor', 'start')
            .text((d: any) => d.year);

        // Add Y Axis - Discount Value
        const yScale = d3
            .scaleLinear()
            .domain([0, maximumDiscountInData + maximumDiscountInData / 10])
            .range([this.boundingHeight, 0])
            // To make sure the axis starts and ends on round numbers
            .nice();
        const yAxisGenerator = d3.axisLeft(yScale);
        this.svg
            .append('g')
            .attr('class', 'yAxis')
            .call(yAxisGenerator)
            .call(d3.axisLeft(yScale).tickFormat(d3.format('.0%')));

        // Add Y Right Axis - ROI
        const yRightScale = d3
            .scaleLinear()
            .domain([0, maximumROIInData + maximumROIInData / 10])
            .range([this.boundingHeight, 0])
            // To make sure the axis starts and ends on round numbers
            .nice();
        const yRightAxisGenerator = d3.axisRight(yRightScale);
        this.svg
            .append('g')
            .attr('class', 'yRightAxis')
            .attr('transform', 'translate(' + this.boundingWidth + ',0)')
            .call(yRightAxisGenerator)
            .call(d3.axisRight(yRightScale).tickFormat(d3.format('.1f')));

        // Show the bars
        this.svg
            .append('g')
            .attr('class', 'barChart')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (d: any) => xScale(d.timePeriod))
            .attr('y', (d: any) => yScale(d.discount))
            .attr('yRoi', (d: any) => yRightScale(d.roi))
            .attr('name', (d: any) => d.name)
            .attr('width', xScale.bandwidth())
            .attr('height', (d: any) => this.boundingHeight - yScale(d.discount))
            .attr('fill', (d: any) =>
                d.seasonality === 'high'
                    ? '#0284C7'
                    : d.seasonality === 'med'
                    ? '#7DD3FC'
                    : d.seasonality === 'low'
                    ? '#E0F2FE'
                    : '#ffffff',
            )
            .attr('style', (d: any) => (d.holiday ? 'stroke:#075985;stroke-width:1' : ''))
            .on('mouseover', mouseover)
            .on('mouseleave', mouseleave);

        // Show the line
        const line = d3
            .line()
            .x((d) => d[0])
            .y((d) => d[1]);

        const points: [number, number][] = data.map((d) => [
            (xScale(d.timePeriod) ?? 0) + xScale.bandwidth() / 2,
            yRightScale(d.roi),
        ]);
        // Line
        this.svg
            .append('g')
            .append('path')
            .data(data)
            .attr('fill', 'none')
            .attr('stroke', '#FFDC00')
            .attr('stroke-width', 1.5)
            .attr('stroke-dasharray', 4)
            .attr('d', line(points));
        // Line points
        this.svg
            .append('g')
            .selectAll('dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d: any) => (xScale(d.timePeriod) ?? 0) + xScale.bandwidth() / 2)
            .attr('cy', (d: any) => yRightScale(d.roi))
            .attr('r', '6')
            .attr('fill', '#FFDC00')
            .attr('opacity', 0.1)
            .attr('yRoi', (d: any) => yRightScale(d.roi))
            .attr('yDiscount', (d: any) => yScale(d.discount))
            .attr('name', (d: any) => d.name)
            .attr('discount', (d: any) =>
                d.seasonality === 'high'
                    ? '#0284C7'
                    : d.seasonality === 'med'
                    ? '#7DD3FC'
                    : d.seasonality === 'low'
                    ? '#E0F2FE'
                    : '#ffffff',
            )
            .on('mouseover', mouseoverPoint)
            .on('mouseleave', mouseleavePoint);

        // Discount Depth axis label
        this.svg
            .append('text')
            .attr('class', 'label')
            .attr('id', 'leftAxisLabel')
            .attr('x', -50)
            .attr('y', -25)
            .attr('text-anchor', 'start')
            .text('Discount depth');

        // ROI axis label
        this.svg
            .append('text')
            .attr('class', 'label')
            .attr('id', 'rightAxisLabel')
            .attr('x', this.boundingWidth - 45) // Programatically change this value based on the selection for Seasonality Index
            // .attr('x', this.boundingWidth) // Programatically change this value based on the selection for ROI
            .attr('y', -25)
            .attr('text-anchor', 'start')
            .text('Seasonality Index'); // Programatically change this value based on the selection for Seasonality Index

        const chart = this.svg;

        // Event handlers
        function mouseover(datum: any, index: any, nodes: any) {
            const xSubGroupPosition = parseFloat(d3.select(datum.target).attr('x'));
            const midPoint = xScale.bandwidth() / 2;

            // Calculate optimal co-ordinates for Indicator
            const xPositionForIndicator = xSubGroupPosition + midPoint;

            // Calculate optimal co-ordinates for tooltip
            const yBar = parseFloat(d3.select(datum.target).attr('y'));
            const yLine = parseFloat(d3.select(datum.target).attr('yRoi'));
            const xPositionForTooltip = xSubGroupPosition + midPoint - 72;
            const yPositionForTooltip = (yBar < yLine ? yBar : yLine) - 30;

            // Create a line
            chart
                .append('line')
                .attr('id', 'indicatorLine')
                .attr('x1', xPositionForIndicator)
                .attr('x2', xPositionForIndicator)
                .attr('y1', '0')
                .attr('y2', boundingHeight);

            // Create a blip for bar
            chart
                .append('circle')
                .attr('id', 'indicatorBlip')
                .attr('cx', xPositionForIndicator)
                .attr('cy', parseFloat(d3.select(datum.target).attr('y')))
                .attr('r', '3')
                .attr('stroke', '#A1A1AA')
                .attr('stroke-width', '1')
                .attr('fill', '#E4E4E7');
            // Create a blip for line
            chart
                .append('circle')
                .attr('id', 'indicatorBlip')
                .attr('cx', xPositionForIndicator)
                .attr('cy', parseFloat(d3.select(datum.target).attr('yRoi')))
                .attr('r', '3')
                .attr('stroke', '#A1A1AA')
                .attr('stroke-width', '1')
                .attr('fill', '#E4E4E7');

            // Update the tooltip
            d3.select('#calendarSimulated-tooltip')
                .style('opacity', '1')
                .style('left', xPositionForTooltip + 'px')
                .style('top', yPositionForTooltip + 'px');
            if (index.seasonality === 'high' || index.seasonality === 'med' || index.seasonality === 'low') {
                d3.select('#calendarSimulated-tooltip')
                    .select('#base')
                    .text('Discount: ' + d3.format('.0%')(index.discount));
                d3.select('#calendarSimulated-tooltip')
                    .select('#baseColor')
                    .style('background-color', d3.select(datum.target).attr('fill'));
            } else {
                d3.select('#calendarSimulated-tooltip').select('#base').attr('class', 'hidden');
            }

            if (index.holiday) {
                d3.select('#calendarSimulated-tooltip')
                    .select('#holiday')
                    .attr('class', 'flex flex-row items-center space-x-2');
            } else {
                d3.select('#calendarSimulated-tooltip').select('#holiday').attr('class', 'hidden');
            }
            d3.select('#calendarSimulated-tooltip')
                .select('#week')
                .text(index.name + ' - ' + index.timePeriod);
            d3.select('#calendarSimulated-tooltip')
                .select('#roi')
                .text('Seasonality Index: ' + index.roi);
        }

        function mouseleave(datum: any, index: any, nodes: any) {
            // Update the tooltip
            d3.select('#calendarSimulated-tooltip').style('opacity', '0');
            chart.selectAll('#indicatorLine').remove();
            chart.selectAll('#indicatorBlip').remove();
        }
        function mouseoverPoint(datum: any, index: any, nodes: any) {
            console.log({ datum, index });
            const xPointPosition = parseFloat(d3.select(datum.target).attr('cx'));

            // Calculate optimal co-ordinates for Indicator
            const xPositionForIndicator = xPointPosition;

            // Calculate optimal co-ordinates for tooltip
            const yBar = parseFloat(d3.select(datum.target).attr('yDiscount'));
            const yLine = parseFloat(d3.select(datum.target).attr('cy'));
            const xPositionForTooltip = xPointPosition - 72;
            const yPositionForTooltip = (yBar < yLine ? yBar : yLine) - 30;

            // Create a line
            chart
                .append('line')
                .attr('id', 'indicatorLine')
                .attr('x1', xPositionForIndicator)
                .attr('x2', xPositionForIndicator)
                .attr('y1', '0')
                .attr('y2', boundingHeight);

            // Create a blip for line
            chart
                .append('circle')
                .attr('id', 'indicatorBlip')
                .attr('cx', xPositionForIndicator)
                .attr('cy', parseFloat(d3.select(datum.target).attr('cy')))
                .attr('r', '3')
                .attr('stroke', '#A1A1AA')
                .attr('stroke-width', '1')
                .attr('fill', '#E4E4E7');

            // Create a blip for bar
            chart
                .append('circle')
                .attr('id', 'indicatorBlip')
                .attr('cx', xPositionForIndicator)
                .attr('cy', parseFloat(d3.select(datum.target).attr('yDiscount')))
                .attr('r', '3')
                .attr('stroke', '#A1A1AA')
                .attr('stroke-width', '1')
                .attr('fill', '#E4E4E7');

            // Update the tooltip
            d3.select('#calendarSimulated-tooltip')
                .style('opacity', '1')
                .style('left', xPositionForTooltip + 'px')
                .style('top', yPositionForTooltip + 'px');
            if (index.seasonality === 'high' || index.seasonality === 'med' || index.seasonality === 'low') {
                d3.select('#calendarSimulated-tooltip')
                    .select('#base')
                    .text('Discount: ' + d3.format('.0%')(index.discount));
                d3.select('#calendarSimulated-tooltip')
                    .select('#baseColor')
                    .style('background-color', d3.select(datum.target).attr('discount'));
            } else {
                d3.select('#calendarSimulated-tooltip').select('#base').attr('class', 'hidden');
            }

            if (index.holiday) {
                d3.select('#calendarSimulated-tooltip')
                    .select('#holiday')
                    .attr('class', 'flex flex-row items-center space-x-2');
            } else {
                d3.select('#calendarSimulated-tooltip').select('#holiday').attr('class', 'hidden');
            }
            d3.select('#calendarSimulated-tooltip')
                .select('#week')
                .text(index.name + ' - ' + index.timePeriod);
            d3.select('#calendarSimulated-tooltip')
                .select('#roi')
                .text('Seasonality Index: ' + index.roi);
        }

        function mouseleavePoint(datum: any, index: any, nodes: any) {
            // Update the tooltip
            d3.select('#calendarSimulated-tooltip').style('opacity', '0');
            chart.selectAll('#indicatorLine').remove();
            chart.selectAll('#indicatorBlip').remove();
        }
    }
}
