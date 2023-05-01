import Chart from 'chart.js/auto'
import { ChartItem, ChartData} from 'chart.js/auto'
import { MutableRefObject, useRef, useEffect, LegacyRef } from 'react'
import { LatestArticleProps } from "@/lib/api/articles";
import { SimpleGrid } from '@chakra-ui/react';

interface DataItem {
    [key: string]: LatestArticleProps[]
}

interface KeywordCount {
    keyword: string,
    positive: number,
    negative: number
}

const KeywordPieChart = ({ data, threshold, keyword }: {data: LatestArticleProps[], threshold: number, keyword: string}) => {
    const chartRef: MutableRefObject<ChartItem | null> = useRef(null)

    const resultItem: KeywordCount = {
        keyword: keyword,
        positive: 0,
        negative: 0
    }
    const low_keyword = keyword.toLowerCase()

    const countKeywordsPositivity : void = data.forEach(item => {
        if (keyword==="" || item.title.toLowerCase().includes(low_keyword) || item.body.toLowerCase().includes(low_keyword)) {
            if (item.scores.compound >= threshold) {
                resultItem.positive += 1
            } else {
                resultItem.negative += 1
            }
        }
    })

    const chartData: ChartData<'pie'> = {
        labels: ["Positive", "Negative"],
        datasets: [
            {
                label: 'Count',
                data: [resultItem.positive, resultItem.negative],
                backgroundColor: ["#4FD1C5", "#1D4044"],
                hoverOffset: 4
            }
        ]
    };

    useEffect(() => {
        const chart = new Chart(chartRef.current as HTMLCanvasElement, {
            type: 'pie',
            data: chartData,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `Count of Positive vs Negative News for keyword "${keyword}"`
                    }
                },
                aspectRatio: 1.4,
            }
        });
        return () => {
            chart.destroy();
          };
    }, [keyword]);
    
    
    return (
        <>
            
            <canvas style={{padding: "1em"}} ref={chartRef as LegacyRef<HTMLCanvasElement>}></canvas>
        </>
    )
}

export default KeywordPieChart