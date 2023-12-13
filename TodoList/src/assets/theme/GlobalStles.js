import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  	:root{
		--bg: ${({ theme }) => theme.bg};
		--text-light: ${({ theme }) => theme.textLight};
		--text-support: ${({ theme }) => theme.textSupport};
		--bg-light: ${({ theme }) => theme.bgLight};
		--text: ${({ theme }) => theme.text};
	}
`;