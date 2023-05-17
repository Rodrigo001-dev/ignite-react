import { useFormContext } from "react-hook-form";

import { Input } from "../../../../components/Input";

import { AddressFormContainer } from "./styles";

export function AddressForm() {
  const { register } = useFormContext();

  return (
    <AddressFormContainer>
      <div className="cep">
        <Input required type="number" placeholder="CEP" {...register("cep")} />
      </div>

      <div className="street">
        <Input required placeholder="Rua" {...register("street")} />
      </div>

      <div className="number">
        <Input
          required
          type="number"
          placeholder="Número"
          {...register("number")}
        />
      </div>

      <div className="complement">
        <Input
          placeholder="Complemento"
          {...register("complement")}
          rightText="Opcional"
        />
      </div>

      <Input required placeholder="Bairro" {...register("district")} />
      <Input required placeholder="Cidade" {...register("city")} />
      <Input required placeholder="UF" {...register("uf")} />
    </AddressFormContainer>
  );
}
