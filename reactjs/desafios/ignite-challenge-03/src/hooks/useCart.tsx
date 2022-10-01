import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    // buscar os dados do localStorage
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    // se não for null vai entrar dentro do if e rotornar o valor transformando
    // ele no valor originial JSON.parse(storagedCart)
    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    // o storagedCart poder ser null, se ela for null eu vou retornar um [] vazio
    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      // dessa forma o updatedCart é um novo [] com os valores de cart
      // qualquer alteração que eu fizer no updatedCart não vai refletir no cart
      // para respeitar a regra da imutabilidade
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);

      const stock = await api.get(`/stock/${productId}`);

      const stockAmount = stock.data.amount;
      // se o produto existe no carrinho eu vou pegar o amount dele
      // se não existe no carrinho a quantidade dele é zero
      const currentAmount = productExists ? productExists.amount : 0;
      // quantidade desejada
      const amount = currentAmount + 1;

      // se a quantidade desejada(amount) for maior que a quantidade que eu tenho
      // em estoque vai dar um erro
      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      // se o produto existe vai ser atualizado a quantidade de produto
      if (productExists) {
        productExists.amount = amount;
      } else {
        // se for um produto novo(que não foi adicionado no carrinho)
        const product = await api.get(`/produts/${productId}`);

        // para acidionar um novo produto no carrinho eu preciso pegar os dados
        // que foram retornados da api e adiconar o campo amount como 1
        // porque foi a primeira vez que ele foi acicionado
        const newProduct = {
          ...product.data,
          amount: 1
        };
        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(product => product.id === productId);

      // se ele encontrou o produto
      if (productIndex >= 0) {
        // o splice precisa de 2 parâmetros, o primeiro é onde eu quero começar
        // a deletar e o segundo é a quantidade de items que eu quero deletar
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      } else {
        // se ele não encontrar o item no carrinho eu vou forçar um erro para ele
        // cair no catch
        throw Error();
      }
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return;
      }

      const stock = await api.get(`/stock/${productId}`);

      const stockAmount = stock.data.amount;

      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);

      if (productExists) {
        productExists.amount = amount;
        setCart(updatedCart);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      } else {
        throw Error();
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
