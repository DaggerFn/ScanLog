{
  /*
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-reanimated-table';


// Tipando o estado da classe
interface State {
  tableHead: string[];         // Array de cabeçalhos
  tableData: string[][];       // Array bidimensional de dados da tabela
}

export default class ExampleFour extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tableHead: ['Local', 'Material', 'Quantidade', 'Editar'],
      tableData: [
        ['B1 - Almox Cabos', '19217838', '28', 'Nothing'],
        ['B2 - Almox Comprados', '19217838', '3', 'Nothing'],
        ['B4 - DG', '19217838', '14', 'Nothing'],
        ['B6 - Fábrica VIII', '19217838', '25', 'Nothing'],
      ]
    };
  }

  // Tipando a função _alertIndex para receber um número como parâmetro
  _alertIndex(index: number): void {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;


    // Tipando a função `element` para aceitar parâmetros `data` e `index` com tipos adequados
    const element = (data: string, index: number): JSX.Element => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderColor: 'transparent' }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
          {
            state.tableData.map((rowData: string[], index: number) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData: string, cellIndex: number) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: '1%',
    padding: 16,
    paddingTop: 30, 
    // backgroundColor: '#fff' 
  },
  head: {
    gap: 1,
    height: 40, 
    backgroundColor: '#808B97' 
  },
  text: { 
    margin: 6,
    fontSize: 18,
  },
  row: { 
    flexDirection: 'row',
    backgroundColor: '#FFF1C1',
  },
  btn: { 
    width: 58, 
    height: 18, 
    backgroundColor: '#78B7BB', 
    borderRadius: 2
  },
  btnText: {
    textAlign: 'center', 
    color: '#fff'
  }
});
*/
}

import React from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";
import { useState, useEffect } from "react";
import {
  deleteMaterial,
  getMateriais,
  searchMaterial,
} from "@/components/api/api";

export default function App() {
  const [materiais, setMateriais] = useState([]);

  type listOfMaterials = {
    id_material: undefined;
    locale_material: undefined;
  };

  // Buscar materiais ao iniciar o app
  useEffect(() => {
    fetchMateriais();
  }, []);

  const fetchMateriais = async () => {
    try {
      const data = await getMateriais();
      setMateriais(data);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
    }
  };

  const handleDelete = async (id_material: string) => {
    try {
      await deleteMaterial(id_material);
      alert("Material deletado!");
      fetchMateriais();
    } catch (error) {
      console.error("Erro ao deletar material:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={materiais}
        keyExtractor={(item) => item.id_material.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 10,
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Text>N° do Material: {item.id_material}</Text>
            <Text>Descrição do Material: {item.description_material}</Text>
            <Text>Local: {item.locale_material}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Ultima modificação: {item.last_mod}</Text>

            <Button
              title="Deletar"
              onPress={() => handleDelete(item.id_material)}
            />
          </View>
        )}
      />
    </View>
  );
}
