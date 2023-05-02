import Chart from 'chart.js/auto'
import { ChartItem, ChartData} from 'chart.js/auto'
import { MutableRefObject, useRef, useEffect, LegacyRef } from 'react'
import { LatestArticleProps } from "@/lib/api/articles";
import { SimpleGrid } from '@chakra-ui/react';

interface DataItem {
    [key: string]: LatestArticleProps[]
}

const NewsContentChart = ({ data, threshold }: {data: LatestArticleProps[], threshold: number}) => {
    const chartRef: MutableRefObject<ChartItem | null> = useRef(null)

    const groupBySources: {[key: string]: LatestArticleProps[]} = data.reduce((returnObject, dataObject) => {
        if (returnObject[dataObject.source]) {
            returnObject[dataObject.source].push(dataObject)
        } else {
            returnObject[dataObject.source] = [dataObject]
        }

        return returnObject
    }, {} as DataItem)

    const countSources: { [key: string]: [number, number] } = {};
    
    Object.keys(groupBySources).forEach(source => {
        const aboveThreshold = groupBySources[source].filter(obj => obj.scores.compound >= threshold).length;
        const belowThreshold = groupBySources[source].length - aboveThreshold;
        countSources[source] = [aboveThreshold, belowThreshold];
    });

    const chartData: ChartData<'bar'> = {
        labels: Object.keys(countSources),
        datasets: [
            {
                label: 'Positive News',
                stack: 'Stack 0',
                data: Object.values(countSources).map((item) => item[0]),
                backgroundColor: '#81E6D9'
            },
            {
                label: 'Negative News',
                stack: 'Stack 1',
                data: Object.values(countSources).map((item) => item[1]),
                backgroundColor: '#276749',
            }
        ]
    };

    useEffect(() => {
        const chart = new Chart(chartRef.current as HTMLCanvasElement, {
            type: 'bar',
            data: chartData,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Count of Positive vs Negative Environmental News in Different Sources"
                    }
                },
                aspectRatio: 1.25,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                }
            }
        });
        return () => {
            chart.destroy();
          };
    }, []);
    
    
    return (
        <>
            <canvas style={{ padding:"1em"}} ref={chartRef as LegacyRef<HTMLCanvasElement>}></canvas>
        </>
    )
}

export default NewsContentChart