import Chart from 'chart.js/auto'
import { ChartItem, ChartData} from 'chart.js/auto'
import { MutableRefObject, useRef, useEffect, LegacyRef } from 'react'
import { LatestArticleProps } from "@/lib/api/articles";

interface DataItem {
    [key: string]: LatestArticleProps[]
}

const NewsContentChart = ({ data, threshold }: {data: LatestArticleProps[], threshold: number}) => {
    const chartRef: MutableRefObject<ChartItem | null> = useRef(null)

    // Count the number of objects that cross the threshold
    const aboveThreshold = data.filter(obj => obj.scores.compound >= threshold).length;
    const belowThreshold = data.length - aboveThreshold;

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
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            },
            {
                label: 'Negative News',
                stack: 'Stack 1',
                data: Object.values(countSources).map((item) => item[1]),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
                        text: "Count of Positive vs Negative News in Different Sources"
                    }
                },
                aspectRatio: 1,
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
    }, [chartData]);
    
    
    return (
        <>
            <canvas style={{maxHeight: "500px"}} ref={chartRef as LegacyRef<HTMLCanvasElement>}></canvas>
        </>
    )
}

export default NewsContentChart