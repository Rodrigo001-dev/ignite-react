import dynamic from 'next/dynamic';
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from 'apexcharts';

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

// o dynamic é utilizado para carregar alguma componente de uma forma dinâmica
const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

const options: ApexOptions = {
  chart: {
    toolbar: {
      // show: false vai remover o menu
      show: false
    },
    zoom: {
      // enabled: false vai tirar o zoom que eu tenho por padrão nos gráficos
      enabled: false,
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false,
  },
  dataLabels: {
    // enabled: false vai remover as labels que ficam nos dados
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-03-18T00:00:00.000Z',
      '2022-03-19T00:00:00.000Z',
      '2022-03-20T00:00:00.000Z',
      '2022-03-21T00:00:00.000Z',
      '2022-03-22T00:00:00.000Z',
      '2022-03-23T00:00:00.000Z',
      '2022-03-24T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      // estou dizendo que eu quero que ele va do mais claro para o mais escuro
      shade: 'dark',
      // opacityFrom é a opacidade que ele vai iniciar
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  { name: 'series1', data: [31, 120, 10, 28, 51, 18, 109] }
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      {/* mx=auto é para ficar centralizado */}
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        {
          /*
           o SimpleGrid é um componente para abilitar a criação de grid que são
           siples, ou seja, grid com funcionamento muito simples
          */
        }
        {
          /* 
            o minChildWidth quer dizer que todos os items dentro do grid devem
            ter no minimo 320px, isso vai fazer com que o grid seja responsivo
            de forma totalmente automatizada, porque quando o meu item ficar
            menor que 320px de largura ele vai quebrar automáticamente a linha
            e colocar esses items para baixo
          */
        }
        <SimpleGrid 
          flex="1" 
          gap="4" 
          minChildWidth="320px" 
          alignItems="flex-start"
        >
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Charts options={options} series={series} type="area" height={160} />
          </Box>

          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Charts options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};