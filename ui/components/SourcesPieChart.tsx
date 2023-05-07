import Chart from 'chart.js/auto'
import { ChartItem, ChartData} from 'chart.js/auto'
import { MutableRefObject, useRef, useEffect, LegacyRef } from 'react'
import { LatestArticleProps } from "@/lib/api/articles";
import { SimpleGrid } from '@chakra-ui/react';

interface DataItem {
    [key: string]: LatestArticleProps[]
}

const SourcesPieChart = ({ data, threshold }: {data: LatestArticleProps[], threshold: number}) => {
    const chartRef: MutableRefObject<ChartItem | null> = useRef(null)

    const groupBySources: {[key: string]: LatestArticleProps[]} = data.reduce((returnObject, dataObject) => {
        if (returnObject[dataObject.source]) {
            returnObject[dataObject.source].push(dataObject)
        } else {
            returnObject[dataObject.source] = [dataObject]
        }

        return returnObject
    }, {} as DataItem)

    const countSources: { [key: string]: number } = {};
    
    Object.keys(groupBySources).forEach(source => {
        countSources[source] = groupBySources[source].length
    });

    const chartData: ChartData<'doughnut'> = {
        labels: Object.keys(countSources),
        datasets: [
            {
                label: 'Share of News Sources',
                data: Object.values(countSources),
                backgroundColor: ["#B2F5EA", "#4FD1C5", "#319795", "#285E61", "#1D4044", "#68D391", "#38A169", "#276749"],
                hoverOffset: 4
            }
        ]
    };

    useEffect(() => {
        const chart = new Chart(chartRef.current as HTMLCanvasElement, {
            type: 'doughnut',
            data: chartData,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Count of Articles from Different Sources"
                    }
                },
                aspectRatio: 1.25,
            }
        });
        return () => {
            chart.destroy();
          };
    }, []);
    
    
    return (
        <>
            
            <canvas style={{padding: "1em"}} ref={chartRef as LegacyRef<HTMLCanvasElement>}></canvas>
        </>
    )
}

export default SourcesPieChart