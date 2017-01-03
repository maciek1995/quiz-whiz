Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  devise_for :users

  root to: 'home#index'

  resources :games, only: [:show] do
    member do
      post :finish
      post :abort
    end

    collection do
      post :play_now
    end
  end

  resources :messages, only: [:create]
end
