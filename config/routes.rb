Rails.application.routes.draw do


  mount ActionCable.server => '/cable'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  resources :games, only: [:show] do
    get :current
    get :play_now
  end

  resources :messages, only: [:create]
end
