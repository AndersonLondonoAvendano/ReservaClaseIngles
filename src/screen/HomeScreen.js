import styled from "styled-components/native";

export default function HomeScreen(){
    return (
        <SView>
            <SText>Componente</SText>
        </SView>
    )
}



const SView = styled.View`
    flex:1;
    justify-content: center;
    align-items:center;
`
const SText = styled.Text`
`